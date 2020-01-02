// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ts/Model/Eventing.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Eventing =
/** @class */
function () {
  function Eventing() {
    var _this = this;

    this.events = {}; //registering events

    this.on = function (eventName, callback) {
      var handler = _this.events[eventName] || [];
      handler.push(callback);
      _this.events[eventName] = handler;
    }; //triggering evens


    this.trigger = function (eventName) {
      var handler = _this.events[eventName];

      if (handler) {
        handler.forEach(function (callback) {
          callback();
        });
      } else {
        throw new Error("event not found");
      }
    };
  }

  return Eventing;
}();

exports.Eventing = Eventing;
},{}],"src/ts/Model/Sync.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sync =
/** @class */
function () {
  function Sync() {
    var _this = this;

    this.setData = function (key, obj) {
      var alreadyData = _this.getData(key);

      if (alreadyData) {
        var allist = JSON.parse(alreadyData);
        allist.concat(obj);
        localStorage.setItem(key, JSON.stringify(obj));
        return true;
      } else {
        localStorage.setItem(key, JSON.stringify(obj));
        return false;
      }
    };

    this.getData = function (key) {
      var data = localStorage.getItem(key);

      if (data) {
        return data;
      } else {
        console.log("no record");
      }
    };
  }

  return Sync;
}();

exports.Sync = Sync;
},{}],"src/ts/Model/List.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Eventing_1 = require("./Eventing");

var Sync_1 = require("./Sync");

var List =
/** @class */
function () {
  function List(list, event, sync) {
    var _this = this;

    if (list === void 0) {
      list = [];
    }

    if (event === void 0) {
      event = new Eventing_1.Eventing();
    }

    if (sync === void 0) {
      sync = new Sync_1.Sync();
    }

    this.list = list;
    this.event = event;
    this.sync = sync; //save data to storage

    this.onSave = function () {
      _this.saveData();
    }; //add item into list array


    this.addItem = function (item) {
      if (_this.validator(item)) {
        //attach unique id
        if (_this.list && _this.list.length > 0) {
          item.id = _this.list[_this.list.length - 1].id + 1;
        } else {
          item.id = 0;
        } //edit false by default


        item.edit = false; //attach creation date

        var current_datetime = new Date();
        item.date = _this.dateFormat(current_datetime); //push item to list

        _this.list.push(item); //save data to storage


        _this.event.trigger("change");
      } else {
        throw new Error("please enter correct data");
      }
    };

    this.dateFormat = function (d) {
      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear();
    }; //remove item from list array


    this.removeItem = function (id) {
      //find item
      var index = _this.list.findIndex(function (elm) {
        return elm.id === id;
      }); //remove item


      _this.list.splice(index, 1); //save data to storage


      _this.event.trigger("change");
    }; //update item


    this.updateItem = function (id, newItem) {
      //find item to update
      var item = _this.list.find(function (item) {
        return item.id === id;
      }); //validate and update item


      if (_this.validator(item)) {
        Object.assign(item, newItem); //save data to storage

        _this.event.trigger("change");
      } else {
        throw new Error("items are not same to update");
      }
    };

    this.find = function (id) {
      var listItem = _this.list.find(function (elm) {
        return elm.id === id;
      });

      return listItem;
    }; //validation


    this.validator = function (obj) {
      var valid; //itterating on obj and validating it

      for (var item in obj) {
        if (item && item !== "") {
          valid = true;
        } else {
          valid = false;
          break;
        }
      }

      return valid;
    };

    this.fetch = function (key) {
      var AppData = _this.sync.getData(key);

      if (AppData) {
        return JSON.parse(AppData);
      }
    };

    this.event.on("change", this.onSave);
  }

  return List;
}();

exports.List = List;
},{"./Eventing":"src/ts/Model/Eventing.ts","./Sync":"src/ts/Model/Sync.ts"}],"src/ts/request.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.author = "auth";
exports.book = "book";
exports.issueBook = "issued";
exports.admin = "admin";
exports.adminDetails = {
  userName: "admin",
  password: "admin"
};
},{}],"src/ts/Model/Book.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var List_1 = require("./List");

var request_1 = require("./../request");

var Book =
/** @class */
function (_super) {
  __extends(Book, _super);

  function Book() {
    var _this = _super.call(this) || this; //find book


    _this.filterBook = function (prop, value) {
      var findedItem = _this.list.filter(function (item) {
        return item[prop] === value;
      });

      if (findedItem) {
        return findedItem;
      } else {
        throw new Error("Book not found!!");
      }
    }; //save its data to app data


    _this.saveData = function () {
      var saved = _this.sync.setData(request_1.book, _this.list);
    }; //check and update presistence


    _this.checkPristense = function () {
      var data = _this.fetch(request_1.book);

      if (data) {
        _this.list = data;
      }
    };

    _this.checkPristense();

    return _this;
  }

  return Book;
}(List_1.List);

exports.Book = Book;
},{"./List":"src/ts/Model/List.ts","./../request":"src/ts/request.ts"}],"src/ts/Model/Author.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var List_1 = require("./List");

var request_1 = require("./../request");

var Author =
/** @class */
function (_super) {
  __extends(Author, _super);

  function Author() {
    var _this = _super.call(this) || this; //save data to global app data


    _this.saveData = function () {
      var saved = _this.sync.setData(request_1.author, _this.list);
    }; //check and update presistence


    _this.checkPristense = function () {
      var data = _this.fetch(request_1.author);

      if (data) {
        _this.list = data;
      }
    };

    _this.checkPristense();

    return _this;
  }

  return Author;
}(List_1.List);

exports.Author = Author;
},{"./List":"src/ts/Model/List.ts","./../request":"src/ts/request.ts"}],"src/ts/Model/IssueBook.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var List_1 = require("./List");

var request_1 = require("./../request");

var IssueBook =
/** @class */
function (_super) {
  __extends(IssueBook, _super);

  function IssueBook() {
    var _this = _super.call(this) || this; //save its data to app data


    _this.saveData = function () {
      var saved = _this.sync.setData(request_1.issueBook, _this.list);
    }; //check and update presistence


    _this.checkPristense = function () {
      var data = _this.fetch(request_1.issueBook);

      if (data) {
        _this.list = data;
      }
    };

    _this.checkPristense();

    return _this;
  }

  return IssueBook;
}(List_1.List);

exports.IssueBook = IssueBook;
},{"./List":"src/ts/Model/List.ts","./../request":"src/ts/request.ts"}],"src/ts/View/AppView.ts":[function(require,module,exports) {
"use strict"; //common parent view class for all view classes

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView =
/** @class */
function () {
  function AppView(parent) {
    this.parent = parent;
  }

  AppView.prototype.eventsMap = function () {
    return {};
  }; //bind event


  AppView.prototype.bindEvent = function (fragment) {
    var eventMap = this.eventsMap();

    var _loop_1 = function _loop_1(eventKey) {
      var _a = eventKey.split(":"),
          eventName = _a[0],
          selector = _a[1];

      fragment.querySelectorAll(selector).forEach(function (elm) {
        elm.addEventListener(eventName, eventMap[eventKey]);
      });
    };

    for (var eventKey in eventMap) {
      _loop_1(eventKey);
    }
  }; //rendering


  AppView.prototype.render = function () {
    if (this.parent) {
      this.parent.innerHTML = "";
      var template = document.createElement("template");
      template.innerHTML = this.template(); //bind event

      this.bindEvent(template.content); //append html

      this.parent.append(template.content);
    }
  };

  return AppView;
}();

exports.AppView = AppView;
},{}],"src/ts/View/View.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView_1 = require("./AppView");

var View =
/** @class */
function (_super) {
  __extends(View, _super);

  function View(parent, model) {
    var _this = _super.call(this, parent) || this;

    _this.parent = parent;
    _this.model = model;

    _this.bindModel = function () {
      _this.model.event.on("change", function () {
        _this.render();
      });
    }; //view validator


    _this.validate = function (value) {
      if (value && value !== "") {
        return true;
      } else {
        return false;
      }
    }; //edit book and author


    _this.editBookAuth = function (e) {
      var bookRowId = e.target.parentElement.parentElement.getAttribute("id"); //make edit to false

      _this.model.list.forEach(function (item) {
        item.edit = false;
      }); //make edit to true


      var item = _this.model.list.find(function (elm) {
        return elm.id === parseInt(bookRowId);
      });

      item.edit = true; //set data to storage

      _this.model.event.trigger("change");
    }; //del book and author


    _this.delBookAuth = function (e) {
      var bookRowId = e.target.parentElement.parentElement.getAttribute("id"); //remove from ui

      _this.model.removeItem(parseInt(bookRowId));
    }; //check for edit modes


    _this.checkBookAuthEdit = function (key) {
      var list = _this.model.fetch(key);

      var current;

      if (list) {
        list.forEach(function (authorItem) {
          if (authorItem.edit) {
            current = authorItem;
          }
        });
      }

      return current;
    };

    _this.bindModel();

    return _this;
  }

  return View;
}(AppView_1.AppView);

exports.View = View;
},{"./AppView":"src/ts/View/AppView.ts"}],"src/ts/View/dashboardView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("../request");

var DashboardView =
/** @class */
function (_super) {
  __extends(DashboardView, _super);

  function DashboardView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  DashboardView.prototype.template = function () {
    var authorList = this.model.fetch(request_1.author) || [];
    var bookList = this.model.fetch(request_1.book) || [];
    var issuedBookList = this.model.fetch(request_1.issueBook) || [];
    return "\n    <div class=\"row my-5\">\n    <div class=\"col-3\">\n      <a href=\"./book-listing.html\"><div class=\"card \">\n      <div class=\"card-body text-center\">\n        <h1>" + bookList.length + "</h1>\n        <p>Book Listed</p>\n      </div>\n    </div></a>\n    </div>\n\n    <div class=\"col-3\">\n     <a href=\"./author-listing.html\">\n     <div class=\"card \">\n     <div class=\"card-body text-center\">\n       <h1>" + authorList.length + "</h1>\n       <p>Registered Authors</p>\n     </div>\n   </div>\n     </a>\n    </div>\n\n    <div class=\"col-3\">\n    <a href=\"./issued-listing.html\">\n    <div class=\"card \">\n    <div class=\"card-body text-center\">\n      <h1>" + issuedBookList.length + "</h1>\n      <p>Issued Books</p>\n    </div>\n  </div>\n    </a>\n  </div>\n\n\n  </div>       \n        ";
  };

  return DashboardView;
}(View_1.View);

exports.DashboardView = DashboardView;
},{"./View":"src/ts/View/View.ts","../request":"src/ts/request.ts"}],"src/ts/View/addAuthorView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var addAuthorView =
/** @class */
function (_super) {
  __extends(addAuthorView, _super);

  function addAuthorView() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //add author btn


    _this.addAuthor = function () {
      var authorName = document.getElementById("authorName").value; //create author obj

      var author = {
        name: authorName
      };

      if (_this.validate(authorName)) {
        //add author into model
        _this.model.addItem(author);
      } else {
        alert("please enter correct author name");
      }
    }; //edit author btn


    _this.editAuthor = function (e) {
      var authorName = document.getElementById("authorName").value;

      if (_this.validate(authorName)) {
        //find existed author
        var id = e.target.getAttribute("data-id"); //update author data

        var authoritem = _this.model.find(parseInt(id));

        authoritem.name = authorName; //set edit back to false

        authoritem.edit = false;

        _this.model.event.trigger("change");
      } else {
        alert("Please enter correct author name");
      }
    };

    return _this;
  }

  addAuthorView.prototype.template = function () {
    //check if edits is on
    var authorEdit = this.checkBookAuthEdit("auth");

    if (authorEdit) {
      return "\n      <div class=\"col-12 justify-content-center d-flex\">\n      <div class=\"inner-wrapper card card-body\">\n        <!-- Login Form -->\n        <form class=\"pt-0\" id=\"addAuthorForm>\n          <h2 class=\"mb-4 text-center\">Add Author</h2>\n          <div class=\"form-group\">\n            <label for=\"authorName\">Author Name</label>\n            <input type=\"email\" class=\"form-control\" placeholder=\"Enter Author Name\" id=\"authorName\" value=\"" + authorEdit.name + "\">\n          </div>\n\n          <a type=\"submit\" class=\"btn btn-primary edit-author\" href=\"./author-listing.html\" id=\"authorEditMode\" data-id=\"" + authorEdit.id + "\">\n            Add\n          </a>\n                            </form>\n                </div>\n        </div>\n      ";
    } else {
      return "\n      <div class=\"col-12 justify-content-center d-flex\">\n      <div class=\"inner-wrapper card card-body\">\n        <!-- Login Form -->\n        <form class=\"pt-0\" id=\"addAuthorForm>\n          <h2 class=\"mb-4 text-center\">Add Author</h2>\n          <div class=\"form-group\">\n            <label for=\"authorName\">Author Name</label>\n            <input type=\"email\" class=\"form-control\" placeholder=\"Enter Author Name\" id=\"authorName\">\n          </div>\n\n          <a type=\"submit\" class=\"btn btn-primary add-author\" href=\"#\">\n            Add\n          </a>\n                            </form>\n                </div>\n        </div>\n      ";
    }
  }; //events map


  addAuthorView.prototype.eventsMap = function () {
    return {
      "click: .add-author": this.addAuthor,
      "click: .edit-author": this.editAuthor
    };
  };

  return addAuthorView;
}(View_1.View);

exports.addAuthorView = addAuthorView;
},{"./View":"src/ts/View/View.ts"}],"src/ts/View/authorListingView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("./../request");

var authorListingView =
/** @class */
function (_super) {
  __extends(authorListingView, _super);

  function authorListingView() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //generate list html


    _this.listHtml = function () {
      var markup = "";

      var authorList = _this.model.fetch(request_1.author);

      if (authorList) {
        authorList.forEach(function (authorItem, index) {
          markup += "\n        <tr id=\"" + authorItem.id + "\">\n          <th scope=\"row\">" + index + "</th>\n          <td>" + authorItem.name + "</td>\n          <td>" + authorItem.date + "</td>\n          <td>\n            <a class=\"btn btn-primary edit-author\" href=\"./add-author.html\">Edit</a>\n            <a class=\"btn btn-danger delete-author\">Delete</a>\n          </td>\n        </tr>\n        ";
        });
      }

      return markup;
    };

    return _this;
  }

  authorListingView.prototype.template = function () {
    return "\n    <div class=\"col-12 justify-content-center d-flex\">\n    <table class=\"table table-hover\">\n      <thead>\n        <tr>\n          <th scope=\"col\">#</th>\n          <th scope=\"col\">Author</th>\n          <th scope=\"col\">Creation Date</th>\n          <th scope=\"col\">Action</th>\n        </tr>\n      </thead>\n      <tbody>\n        " + this.listHtml() + "                  \n      </tbody>\n      </table>\n</div>\n      ";
  }; //event mapping for author listing class


  authorListingView.prototype.eventsMap = function () {
    return {
      "click: .edit-author": this.editBookAuth,
      "click: .delete-author": this.delBookAuth
    };
  };

  return authorListingView;
}(View_1.View);

exports.authorListingView = authorListingView;
},{"./View":"src/ts/View/View.ts","./../request":"src/ts/request.ts"}],"src/ts/View/addBookView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("../request");

var addBookView =
/** @class */
function (_super) {
  __extends(addBookView, _super);

  function addBookView() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //check isbn


    _this.checkIsbn = function (e) {
      var isbnNum = parseInt(e.target.value);

      if (isbnNum) {
        var bookList = _this.model.fetch(request_1.book);

        var itemFound = void 0;

        if (bookList) {
          itemFound = bookList.find(function (elm) {
            return elm.isbn === isbnNum;
          });
        }

        var alertDiv = document.getElementById("isbnAlert"); //hide show erro message

        if (itemFound && alertDiv) {
          alertDiv.classList.add("d-block");
          document.querySelector(".book-submit").classList.add("disabled");
        } else if (alert) {
          alertDiv.classList.remove("d-block");
          document.querySelector(".book-submit").classList.remove("disabled");
        }
      }
    }; //add book form submittion


    _this.addBook = function (e) {
      var book = _this.getData();

      if (book) {
        _this.model.addItem(book);
      } else {
        e.preventDefault();
      }
    }; //get data from view and validate it


    _this.getData = function () {
      //get data from view
      var bookName = document.getElementById("bookName").value;
      var bookIsbn = document.getElementById("IsbnNumber").value;
      var bookPrice = document.getElementById("bookPrice").value;
      var bookCopies = document.getElementById("bookQuantity").value;
      var bookAuthor = document.getElementById("bookAuthorSelect").value; //validate data and return it

      if (_this.validate(bookName) && _this.validate(bookIsbn) && _this.validate(bookPrice) && _this.validate(bookAuthor) && _this.validate(bookCopies) && parseInt(bookIsbn) > 0 && parseInt(bookCopies) > 0 && parseInt(bookPrice) > 0) {
        var bookItem = {
          name: bookName,
          isbn: parseInt(bookIsbn),
          price: parseInt(bookPrice),
          copies: parseInt(bookCopies),
          author: bookAuthor
        };
        return bookItem;
      } else {
        alert("please enter correct book data");
        return false;
      }
    }; //create selelct author


    _this.selectAuthorRender = function () {
      var markup = "";
      var select = document.getElementById("bookAuthorSelect");

      var authorList = _this.model.fetch(request_1.author);

      if (authorList) {
        authorList.forEach(function (author) {
          markup += "<option value=\"" + author.name + "\">" + author.name + "</option>";
        });
      }

      return markup;
    }; //edit book btn


    _this.editBook = function (e) {
      var book = _this.getData();

      if (book) {
        //find existed author
        var id = e.target.getAttribute("data-id"); //create book obj

        var bookSingleItem = _this.model.find(parseInt(id));

        bookSingleItem.name = book.name;
        bookSingleItem.author = book.author;
        bookSingleItem.copies = book.copies;
        bookSingleItem.isbn = book.isbn;
        bookSingleItem.price = book.price; //set edit back to false

        bookSingleItem.edit = false; //update obj model

        _this.model.updateItem(parseInt(id), bookSingleItem);

        _this.model.event.trigger("change");
      } else {
        alert("enter correct data");
        e.preventDefault();
      }
    };

    return _this;
  }

  addBookView.prototype.template = function () {
    var bookEdit = this.checkBookAuthEdit("book");

    if (bookEdit) {
      return "\n    <div class=\"col-12 justify-content-center d-flex\">\n    <div class=\"inner-wrapper card card-body\">\n      <!-- Login Form -->\n      <form class=\"pt-0 add-book-form\">\n        <h2 class=\"mb-4 text-center\">Add Book</h2>\n        <div class=\"form-group\">\n          <label for=\"bookName\">Book Name</label>\n          <input type=\"email\" class=\"form-control\" placeholder=\"Enter Book Name\" id=\"bookName\" value=\"" + bookEdit.name + "\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"bookAuthor\">Book Author</label>\n          <select class=\"form-control\" id=\"bookAuthorSelect\">\n            " + this.selectAuthorRender() + "\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"IsbnNumber\">ISBN Number</label>\n          <input type=\"number\" class=\"form-control\" placeholder=\"Enter ISBN Number\" id=\"IsbnNumber\" value=\"" + bookEdit.isbn + "\">\n          <div class=\"alert alert-danger d-none\" id=\"isbnAlert\">\n          This isbn already used please use a different one.\n        </div>\n          <small id=\"emailHelp\" class=\"form-text text-muted\">An ISBN is an International Standard Book Number.ISBN Must be\n            unique</small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"bookPrice\">Book Price</label>\n          <input type=\"number\" class=\"form-control\" placeholder=\"Enter Book Price\" id=\"bookPrice\" value=\"" + bookEdit.price + "\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"bookQuantity\">Book Quantity</label>\n          <input type=\"number\" class=\"form-control\" placeholder=\"Enter Book Quantity\" id=\"bookQuantity\" value=\"" + bookEdit.copies + "\">\n        </div>\n\n        <a type=\"submit\" class=\"btn btn-primary edit-book book-submit\" href=\"./book-listing.html\" data-id=\"" + bookEdit.id + "\">\n          Add\n        </a>\n                          </form>\n              </div>\n      </div>\n      ";
    } else {
      return "\n      <div class=\"col-12 justify-content-center d-flex\">\n      <div class=\"inner-wrapper card card-body\">\n        <!-- Login Form -->\n        <form class=\"pt-0 add-book-form\">\n          <h2 class=\"mb-4 text-center\">Add Book</h2>\n          <div class=\"form-group\">\n            <label for=\"bookName\">Book Name</label>\n            <input type=\"email\" class=\"form-control\" placeholder=\"Enter Book Name\" id=\"bookName\">\n          </div>\n  \n          <div class=\"form-group\">\n            <label for=\"bookAuthor\">Book Author</label>\n            <select class=\"form-control\" id=\"bookAuthorSelect\">\n              " + this.selectAuthorRender() + "\n            </select>\n          </div>\n  \n          <div class=\"form-group\">\n            <label for=\"IsbnNumber\">ISBN Number</label>\n            <input type=\"number\" class=\"form-control\" placeholder=\"Enter ISBN Number\" id=\"IsbnNumber\" />\n            <div class=\"alert alert-danger d-none\" id=\"isbnAlert\">\n              This isbn already used please use a different one.\n            </div>\n            <small id=\"emailHelp\" class=\"form-text text-muted\">An ISBN is an International Standard Book Number.ISBN Must be\n              unique</small>\n          </div>\n  \n          <div class=\"form-group\">\n            <label for=\"bookPrice\">Book Price</label>\n            <input type=\"number\" class=\"form-control\" placeholder=\"Enter Book Price\" id=\"bookPrice\">\n          </div>\n  \n          <div class=\"form-group\">\n            <label for=\"bookQuantity\">Book Quantity</label>\n            <input type=\"number\" class=\"form-control\" placeholder=\"Enter Book Quantity\" id=\"bookQuantity\">\n          </div>\n  \n          <a type=\"submit\" class=\"btn btn-primary add-book book-submit\" href=\"./book-listing.html\">\n            Add\n          </a>\n                            </form>\n                </div>\n        </div>\n        ";
    }
  }; //events map


  addBookView.prototype.eventsMap = function () {
    return {
      "click: .add-book": this.addBook,
      "click: .edit-book": this.editBook,
      "keyup: #IsbnNumber": this.checkIsbn
    };
  };

  return addBookView;
}(View_1.View);

exports.addBookView = addBookView;
},{"./View":"src/ts/View/View.ts","../request":"src/ts/request.ts"}],"src/ts/View/bookListingView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("../request");

var bookListingView =
/** @class */
function (_super) {
  __extends(bookListingView, _super);

  function bookListingView() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //generate list html


    _this.listHtml = function () {
      var markup = "";

      var bookList = _this.model.fetch(request_1.book);

      if (bookList) {
        bookList.forEach(function (bookItem, index) {
          markup += "\n        <tr id=\"" + bookItem.id + "\">\n          <th scope=\"row\">" + index + "</th>\n          <td class=\"bookName\">" + bookItem.name + "</td>\n          <td>" + bookItem.author + "</td>\n          <td>" + bookItem.isbn + "</td>\n          <td>" + bookItem.price + "</td>\n          <td>" + bookItem.copies + "</td>\n          <td>\n              <a class=\"btn btn-primary edit-book\" href=\"./add-book.html\">Edit</a>\n              <a class=\"btn btn-danger delete-book\">Delete</a>\n          </td>\n      </tr>\n        ";
        });
      }

      return markup;
    };

    _this.searchBook = function (e) {
      var currentTitle = e.target.value.toLowerCase();
      var allBooks = document.querySelectorAll(".bookName");

      if (allBooks && currentTitle && currentTitle !== "") {
        Array.from(allBooks).forEach(function (elm) {
          if (elm.textContent.indexOf(currentTitle) == -1) {
            elm.parentElement.style.display = "none";
          }
        });
      } else {
        Array.from(allBooks).forEach(function (elm) {
          //visible all items on empty search box
          elm.parentElement.style.display = "table-row";
        });
      }
    };

    return _this;
  }

  bookListingView.prototype.template = function () {
    return "\n    <div class=\"row mt-5\">\n        <div class=\"col-9\">\n          <h2 class=\"mb-4 text-left\">Book List</h2>\n        </div>\n        <div class=\"col-3\">\n          <input type=\"text\" placeholder=\"Search book by title\" class=\"form-control\" id=\"searchBook\">\n        </div>\n      </div>\n\n      <div class=\"row mt-5\">\n    <div class=\"col-12 justify-content-center d-flex\">\n          <table class=\"table table-hover\">\n            <thead>\n              <tr>\n                <th scope=\"col\">#</th>\n                <th scope=\"col\">Book Name</th>\n                <th scope=\"col\">Author</th>\n                <th scope=\"col\">ISBN</th>\n                <th scope=\"col\">Price</th>\n                <th scope=\"col\">Copies</th>\n                <th scope=\"col\">Action</th>\n              </tr>\n            </thead>\n            <tbody>\n            " + this.listHtml() + "\n            \n          </tbody>\n          </table>\n        </div>\n        </div>\n      ";
  }; //event mapping for author listing class


  bookListingView.prototype.eventsMap = function () {
    return {
      "click: .edit-book": this.editBookAuth,
      "click: .delete-book": this.delBookAuth,
      "keyup: #searchBook": this.searchBook
    };
  };

  return bookListingView;
}(View_1.View);

exports.bookListingView = bookListingView;
},{"./View":"src/ts/View/View.ts","../request":"src/ts/request.ts"}],"src/ts/View/issueBookView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("./../request");

var issBookview =
/** @class */
function (_super) {
  __extends(issBookview, _super);

  function issBookview() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isbnAlert = function (e) {
      //get value
      var currIsbn = parseInt(e.target.value);

      _this.isbnMain(currIsbn);
    }; //main mechanism of fetcher and alert message


    _this.isbnMain = function (currentIsbn) {
      //fetch data
      var bookList = _this.model.fetch(request_1.book); //find book with details using isbn number (using foreach not find only for reference copy not objects)


      var issuedBookDetails = null;

      for (var _i = 0, bookList_1 = bookList; _i < bookList_1.length; _i++) {
        var book_1 = bookList_1[_i];

        if (book_1.isbn === currentIsbn) {
          issuedBookDetails = book_1;
          break;
        } else {
          issuedBookDetails = null;
        }
      }

      if (issuedBookDetails) {
        //hide alert button and update select ui
        document.getElementById("issueIsbnAlert").classList.remove("d-block");
        var issueBookSelect = document.getElementById("IssedBookSelectOpt");
        issueBookSelect.innerText = issuedBookDetails.name;
        return issuedBookDetails;
      } else {
        //show alert
        document.getElementById("issueIsbnAlert").classList.add("d-block");
        return false;
      }
    }; //fetch and save data based on isbn number


    _this.isbnFetcher = function (obj) {
      //find book from isbn
      var bookDetails = _this.isbnMain(obj.issuedIsbn);

      if (bookDetails) {
        obj.bookFullDetail = bookDetails;
      }
    };

    _this.copiesUpdate = function (obj) {
      if (obj.bookFullDetail.copies > 0) {
        //copies available
        obj.bookFullDetail.copies = obj.bookFullDetail.copies - 1;
      } else {
        alert("copies not available for this book");
      }
    }; //issue book event


    _this.issueBook = function (e) {
      var item = _this.getData();

      if (item) {
        //check student id and fetch student data
        //check isbn and fetch book data
        _this.isbnFetcher(item); //check for availables copies and reduce it by 1 if its avaibale


        _this.copiesUpdate(item); //create issued book item and push it into model


        _this.model.addItem(item);
      } else {
        e.preventDefault();
      }
    };

    _this.getData = function () {
      //get data from view
      var studentId = document.getElementById("issueStudentId").value;
      var issueIsbnNum = document.getElementById("IssueIsbnNumber").value;

      if (_this.validate(studentId) && _this.validate(issueIsbnNum)) {
        //return issued book
        var issuedBookItem = {
          studentId: studentId,
          issuedIsbn: parseInt(issueIsbnNum),
          //will chnage it later
          returnDate: "blank for now"
        };
        return issuedBookItem;
      } else {
        alert("data is not correct");
      }
    };

    return _this;
  }

  issBookview.prototype.template = function () {
    //check if edits is on
    return "\n    <div class=\"col-12 justify-content-center d-flex\">\n          <div class=\"inner-wrapper card card-body\">\n            <!-- Login Form -->\n            <form class=\"pt-0\">\n              <h2 class=\"mb-4 text-center\">Issue New Book</h2>\n              <div class=\"form-group\">\n                <label for=\"issueStudentId\">Student Id</label>\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Student Id\" id=\"issueStudentId\">\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"IssueIsbnNumber\">ISBN Number</label>\n                <input type=\"number\" class=\"form-control\" placeholder=\"Enter ISBN Number\" id=\"IssueIsbnNumber\">\n                <div class=\"alert alert-danger d-none\" id=\"issueIsbnAlert\">\n                This isbn doesn't match with any book isbn.\n              </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"IssedBookSelect\">Issuing book</label>\n                <select class=\"form-control\" id=\"IssedBookSelect\" disabled>\n                  <option id=\"IssedBookSelectOpt\">book name by isbn number</option>\n                </select>\n              </div>\n\n              <a type=\"submit\" class=\"btn btn-primary issue-book\" href=\"#\">\n                Issue Book\n              </a>\n                                </form>\n                    </div>\n            </div>\n    ";
  }; //events map


  issBookview.prototype.eventsMap = function () {
    return {
      "click: .issue-book": this.issueBook,
      "keyup: #IssueIsbnNumber": this.isbnAlert
    };
  };

  return issBookview;
}(View_1.View);

exports.issBookview = issBookview;
},{"./View":"src/ts/View/View.ts","./../request":"src/ts/request.ts"}],"src/ts/View/issuedBookListingView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("./../request");

var issuedBookListingView =
/** @class */
function (_super) {
  __extends(issuedBookListingView, _super);

  function issuedBookListingView() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //generate list html


    _this.listHtml = function () {
      var markup = "";

      var issueList = _this.model.fetch(request_1.issueBook);

      if (issueList) {
        issueList.forEach(function (issuedBookItem, index) {
          //#TODO search student name based upon student id
          markup += "\n        <tr id=\"" + issuedBookItem.id + "\">\n        <th scope=\"row\">" + index + "</th>\n        <td>" + issuedBookItem.studentId + "</td>\n        <td>" + issuedBookItem.bookFullDetail.name + "</td>\n        <td>" + issuedBookItem.issuedIsbn + "</td>\n        <td>" + issuedBookItem.date + "</td>\n        <td>" + issuedBookItem.returnDate + "</td>\n\n        <td>\n          <a\n            class=\"btn btn-primary issue-book-details\"\n            href=\"./issued-book-detail.html\"\n            >Show Details</a\n          >\n        </td>\n      </tr>\n        ";
        });
      }

      return markup;
    };

    return _this;
  }

  issuedBookListingView.prototype.template = function () {
    return "\n    <div class=\"col-12 justify-content-center d-flex\">\n          <table class=\"table table-hover\">\n            <thead>\n              <tr>\n                <th scope=\"col\">#</th>\n                <th scope=\"col\">Student Name</th>\n                <th scope=\"col\">Book Name</th>\n                <th scope=\"col\">ISBN</th>\n                <th scope=\"col\">Issued Date</th>\n                <th scope=\"col\">Return Date</th>\n\n                <th scope=\"col\">Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              " + this.listHtml() + "             \n              \n            </tbody>\n          </table>\n        </div>\n      ";
  }; //event mapping for author listing class


  issuedBookListingView.prototype.eventsMap = function () {
    return {
      "click: .issue-book-details": this.editBookAuth
    };
  };

  return issuedBookListingView;
}(View_1.View);

exports.issuedBookListingView = issuedBookListingView;
},{"./View":"src/ts/View/View.ts","./../request":"src/ts/request.ts"}],"src/ts/view/AppView.ts":[function(require,module,exports) {
"use strict"; //common parent view class for all view classes

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView =
/** @class */
function () {
  function AppView(parent) {
    this.parent = parent;
  }

  AppView.prototype.eventsMap = function () {
    return {};
  }; //bind event


  AppView.prototype.bindEvent = function (fragment) {
    var eventMap = this.eventsMap();

    var _loop_1 = function _loop_1(eventKey) {
      var _a = eventKey.split(":"),
          eventName = _a[0],
          selector = _a[1];

      fragment.querySelectorAll(selector).forEach(function (elm) {
        elm.addEventListener(eventName, eventMap[eventKey]);
      });
    };

    for (var eventKey in eventMap) {
      _loop_1(eventKey);
    }
  }; //rendering


  AppView.prototype.render = function () {
    if (this.parent) {
      this.parent.innerHTML = "";
      var template = document.createElement("template");
      template.innerHTML = this.template(); //bind event

      this.bindEvent(template.content); //append html

      this.parent.append(template.content);
    }
  };

  return AppView;
}();

exports.AppView = AppView;
},{}],"src/ts/view/View.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView_1 = require("./AppView");

var View =
/** @class */
function (_super) {
  __extends(View, _super);

  function View(parent, model) {
    var _this = _super.call(this, parent) || this;

    _this.parent = parent;
    _this.model = model;

    _this.bindModel = function () {
      _this.model.event.on("change", function () {
        _this.render();
      });
    }; //view validator


    _this.validate = function (value) {
      if (value && value !== "") {
        return true;
      } else {
        return false;
      }
    }; //edit book and author


    _this.editBookAuth = function (e) {
      var bookRowId = e.target.parentElement.parentElement.getAttribute("id"); //make edit to false

      _this.model.list.forEach(function (item) {
        item.edit = false;
      }); //make edit to true


      var item = _this.model.list.find(function (elm) {
        return elm.id === parseInt(bookRowId);
      });

      item.edit = true; //set data to storage

      _this.model.event.trigger("change");
    }; //del book and author


    _this.delBookAuth = function (e) {
      var bookRowId = e.target.parentElement.parentElement.getAttribute("id"); //remove from ui

      _this.model.removeItem(parseInt(bookRowId));
    }; //check for edit modes


    _this.checkBookAuthEdit = function (key) {
      var list = _this.model.fetch(key);

      var current;

      if (list) {
        list.forEach(function (authorItem) {
          if (authorItem.edit) {
            current = authorItem;
          }
        });
      }

      return current;
    };

    _this.bindModel();

    return _this;
  }

  return View;
}(AppView_1.AppView);

exports.View = View;
},{"./AppView":"src/ts/view/AppView.ts"}],"src/ts/view/issuedBookDetailView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var request_1 = require("./../request");

var issueBookDetailView =
/** @class */
function (_super) {
  __extends(issueBookDetailView, _super);

  function issueBookDetailView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.editedBook = function () {
      //fetch issued book with edit true
      var issuedBookListing = _this.model.fetch(request_1.issueBook);

      if (issuedBookListing) {
        var editedBook = issuedBookListing.find(function (item) {
          return item.edit === true;
        });
        return editedBook;
      } else {
        alert("not any book issued yet");
      }
    };

    return _this;
  }

  issueBookDetailView.prototype.template = function () {
    var editedItem = this.editedBook();
    return "\n    <div class=\"inner-wrapper card card-body\">\n    <!-- Login Form -->\n    <div class=\"pt-0\">\n      <h2 class=\"mb-4 text-center\">Issued Book Details</h2>\n\n      <div class=\"issued-info-block\">\n        <p class=\"student-name\">\n          Student Name: <strong>" + editedItem.studentId + "</strong>\n        </p>\n        <p class=\"book-name\">Book Name: <strong>" + editedItem.bookFullDetail.name + "</strong></p>\n        <p class=\"isbn-number\">ISBN Number: <strong>" + editedItem.issuedIsbn + "</strong></p>\n        <p class=\"issue-date\">\n          Book Issue Date: <strong>" + editedItem.date + "</strong>\n        </p>\n        <p class=\"return-date\">\n          Book Return Date: <strong>" + editedItem.returnDate + "</strong>\n        </p>\n      </div>\n    </div>\n  </div>\n      ";
  }; //event mapping for issuedbook details class


  issueBookDetailView.prototype.eventsMap = function () {
    return {
      "click: .issue-book-details": this.editBookAuth
    };
  };

  return issueBookDetailView;
}(View_1.View);

exports.issueBookDetailView = issueBookDetailView;
},{"./View":"src/ts/view/View.ts","./../request":"src/ts/request.ts"}],"src/ts/Model/Login.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sync_1 = require("./Sync");

var request_1 = require("../request");

var Login =
/** @class */
function () {
  function Login(login, sync) {
    var _this = this;

    if (sync === void 0) {
      sync = new Sync_1.Sync();
    }

    this.login = login;
    this.sync = sync;

    this.saveCred = function () {
      var adminCreds = _this.sync.getData(request_1.admin);

      if (adminCreds) {//admin creds already existed in localstorage
      } else {
        _this.sync.setData(request_1.admin, _this.login);
      }
    };

    this.saveCred();
  }

  return Login;
}();

exports.Login = Login;
},{"./Sync":"src/ts/Model/Sync.ts","../request":"src/ts/request.ts"}],"src/ts/View/LoginView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView_1 = require("./AppView");

var request_1 = require("../request");

var loginView =
/** @class */
function (_super) {
  __extends(loginView, _super);

  function loginView(parent, model) {
    var _this = _super.call(this, parent) || this;

    _this.parent = parent;
    _this.model = model;

    _this.login = function (e) {
      var adminUserName = document.getElementById("Adminusername").value;
      var adminUserPassword = document.getElementById("Adminpwd").value;
      var loginDetail = JSON.parse(_this.model.sync.getData(request_1.admin));

      if (adminUserName === loginDetail.userName && adminUserPassword === loginDetail.password) {//let the user login
      } else {
        alert("Please enter correct username and password");
        e.preventDefault();
      }
    };

    return _this;
  }

  loginView.prototype.template = function () {
    return "\n    <form class=\"pt-0 loginForm\">\n    <h2 class=\"mb-4 text-center\">Login</h2>\n    <div class=\"form-group\">\n      <label for=\"username\">Username</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Enter Username\" id=\"Adminusername\" required>\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"pwd\">Password:</label>\n      <input type=\"password\" class=\"form-control\" placeholder=\"Enter password\" id=\"Adminpwd\" required>\n    </div>\n\n    <a type=\"submit\" href=\"./dashboard.html\" class=\"btn btn-primary loginBtn\">Submit</button>\n  </form>\n      ";
  };

  loginView.prototype.eventsMap = function () {
    return {
      "click: .loginBtn": this.login
    };
  };

  return loginView;
}(AppView_1.AppView);

exports.loginView = loginView;
},{"./AppView":"src/ts/View/AppView.ts","../request":"src/ts/request.ts"}],"src/ts/View/changePassword.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppView_1 = require("./AppView");

var request_1 = require("../request");

var changePasswordView =
/** @class */
function (_super) {
  __extends(changePasswordView, _super);

  function changePasswordView(parent, model) {
    var _this = _super.call(this, parent) || this;

    _this.parent = parent;
    _this.model = model;

    _this.disableButton = function () {
      document.querySelector(".update-password").classList.add("disabled");
    };

    _this.enableButton = function () {
      document.querySelector(".update-password").classList.remove("disabled");
    }; //old password matcher


    _this.oldPasswordMatcher = function () {
      var oldPassword = document.getElementById("oldPassword").value.toLocaleLowerCase();
      var currPassword = JSON.parse(_this.model.sync.getData(request_1.admin));

      if (oldPassword === currPassword.password) {
        document.querySelector(".old-password-error").classList.add("d-none");

        _this.enableButton();
      } else {
        document.querySelector(".old-password-error").classList.remove("d-none");

        _this.disableButton();
      }
    }; //re entered password matcher


    _this.rePasswordMatcher = function () {
      var newPassword = document.getElementById("newPassword").value.toLowerCase();
      var rePassword = document.getElementById("RenewPassword").value.toLowerCase();

      if (newPassword && newPassword === rePassword) {
        document.querySelector(".new-password-error").classList.add("d-none");

        _this.enableButton();

        return rePassword;
      } else {
        document.querySelector(".new-password-error").classList.remove("d-none");

        _this.disableButton();
      }
    };

    _this.updatePassword = function () {
      //save new password to storage
      var newVerifiedPassword = _this.rePasswordMatcher();

      request_1.adminDetails.password = newVerifiedPassword;
      localStorage.setItem(request_1.admin, JSON.stringify(request_1.adminDetails));
    };

    return _this;
  }

  changePasswordView.prototype.template = function () {
    return "\n    <form class=\"pt-0\">\n        <h2 class=\"mb-4 text-center\">Change Password</h2>\n        <div class=\"form-group\">\n        <label for=\"oldPassword\">Old Password</label>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Old Password\" id=\"oldPassword\">\n        <div class=\"alert alert-danger old-password-error d-none\" role=\"alert\">\n        You have entered the wrong password!\n        </div>\n        </div>\n\n        <div class=\"form-group\">\n        <label for=\"newPassword\">New Password</label>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter New Password\" id=\"newPassword\">\n        </div>\n\n        <div class=\"form-group\">\n        <label for=\"RenewPassword\">Re-Enter New Password</label>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Re-Enter New Password\" id=\"RenewPassword\">\n        <div class=\"alert alert-danger new-password-error d-none\" role=\"alert\">\n        Password doesn't match\n        </div>\n        </div>\n\n        <a href=\"./index.html\" type=\"submit\" class=\"btn btn-primary update-password\">\n        Update Password\n        </a>\n    </form>\n        ";
  };

  changePasswordView.prototype.eventsMap = function () {
    return {
      "click: .update-password": this.updatePassword,
      "keyup: #oldPassword": this.oldPasswordMatcher,
      "keyup: #RenewPassword": this.rePasswordMatcher
    };
  };

  return changePasswordView;
}(AppView_1.AppView);

exports.changePasswordView = changePasswordView;
},{"./AppView":"src/ts/View/AppView.ts","../request":"src/ts/request.ts"}],"src/ts/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // models

var Book_1 = require("./Model/Book");

var Author_1 = require("./Model/Author");

var IssueBook_1 = require("./Model/IssueBook"); //views


var dashboardView_1 = require("./View/dashboardView");

var addAuthorView_1 = require("./View/addAuthorView");

var authorListingView_1 = require("./View/authorListingView");

var addBookView_1 = require("./View/addBookView");

var bookListingView_1 = require("./View/bookListingView");

var issueBookView_1 = require("./View/issueBookView");

var issuedBookListingView_1 = require("./View/issuedBookListingView");

var issuedBookDetailView_1 = require("./view/issuedBookDetailView");

var Login_1 = require("./Model/Login");

var LoginView_1 = require("./View/LoginView");

var changePassword_1 = require("./View/changePassword");

var request_1 = require("./request"); //default admin login credentials


var log = new Login_1.Login(request_1.adminDetails); //login work

var logView = new LoginView_1.loginView(document.getElementById("loginView"), log);
logView.render();
var changepassword = new changePassword_1.changePasswordView(document.getElementById("changePasswordView"), log);
changepassword.render(); //book, author and issued books

var book = new Book_1.Book();
var author = new Author_1.Author();
var issueBook = new IssueBook_1.IssueBook(); //view

var dash = new dashboardView_1.DashboardView(document.getElementById("dashboardView"), book);
var addAuth = new addAuthorView_1.addAuthorView(document.getElementById("addAuthorView"), author);
var addBook = new addBookView_1.addBookView(document.getElementById("addBookView"), book);
var authorList = new authorListingView_1.authorListingView(document.getElementById("authorListingView"), author);
var bookList = new bookListingView_1.bookListingView(document.getElementById("bookListingView"), book);
var issueBookView = new issueBookView_1.issBookview(document.getElementById("issueNewBookView"), issueBook);
var issueBookListing = new issuedBookListingView_1.issuedBookListingView(document.getElementById("issuedBookListingViewWrapper"), issueBook);
var issueBookDet = new issuedBookDetailView_1.issueBookDetailView(document.getElementById("issuedBookDetailsView"), issueBook);
addBook.render();
dash.render();
"";
addAuth.render();
authorList.render();
bookList.render();
issueBookView.render();
issueBookListing.render();
issueBookDet.render();
},{"./Model/Book":"src/ts/Model/Book.ts","./Model/Author":"src/ts/Model/Author.ts","./Model/IssueBook":"src/ts/Model/IssueBook.ts","./View/dashboardView":"src/ts/View/dashboardView.ts","./View/addAuthorView":"src/ts/View/addAuthorView.ts","./View/authorListingView":"src/ts/View/authorListingView.ts","./View/addBookView":"src/ts/View/addBookView.ts","./View/bookListingView":"src/ts/View/bookListingView.ts","./View/issueBookView":"src/ts/View/issueBookView.ts","./View/issuedBookListingView":"src/ts/View/issuedBookListingView.ts","./view/issuedBookDetailView":"src/ts/view/issuedBookDetailView.ts","./Model/Login":"src/ts/Model/Login.ts","./View/LoginView":"src/ts/View/LoginView.ts","./View/changePassword":"src/ts/View/changePassword.ts","./request":"src/ts/request.ts"}],"C:/Users/De-coder/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53100" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/De-coder/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/ts/app.ts"], null)
//# sourceMappingURL=/app.059ad2b5.js.map