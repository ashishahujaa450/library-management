export class Sync {
  setData = (key: string, obj): boolean => {
    const alreadyData = this.getData(key);
    if (alreadyData) {
      const allist = JSON.parse(alreadyData);
      allist.concat(obj);
      localStorage.setItem(key, JSON.stringify(obj));
      return true;
    } else {
      localStorage.setItem(key, JSON.stringify(obj));
      return false;
    }
  };

  getData = (key: string) => {
    const data = localStorage.getItem(key);
    if (data) {
      return data;
    } else {
      console.log("no record");
    }
  };
}
