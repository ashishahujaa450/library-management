export class Sync {
  setData = (key: string, obj): void => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  getData = (key: string) => {
    const data = localStorage.getItem(key);
    if (data) {
      return data;
    } else {
      console.log("data not found");
    }
  };
}
