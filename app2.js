// function getData(name) {
//   if (name == "Alvin") {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve({ name: "Alvin", age: Math.floor(Math.random() * 20) });
//       }, 2000);
//     });
//   } else {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject(new Error(`Not allowed to access data.`));
//       }, 2000);
//     });
//   }
// }

function getData(name) {
  return new Promise((resolve, reject) => {
    if (name == "Alvin") {
      setTimeout(() => {
        resolve({ name: "Alvin", age: Math.floor(Math.random() * 20) });
      }, 1500);
    } else {
      setTimeout(() => {
        reject(new Error(`Not allowed to access data.`));
      }, 1500);
    }
  });
}

function getMovies(age) {
  if (age < 12) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ text: "cartoon" });
      }, 1500);
    });
  } else if (age < 18) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ text: "teen movies" });
      }, 1500);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ text: "adult movies" });
      }, 1500);
    });
  }
}

getData("Alvin")
  .then((obj) => {
    console.log(obj);
    return getMovies(obj.age);
  })
  .then((meg) => {
    console.log(meg.text);
  })
  .catch((e) => {
    console.log(e);
  });

//////////////////////////////////////////////Promise 用法示範
let example = new Promise((resolve, reject) => {
  resolve({ name: "Sherry", age: 35 });
  reject(new Error(`not allowed`));
});

example
  .then((d) => {
    console.log(d);
  })
  .catch((e) => {
    console.log(e.message);
  });
