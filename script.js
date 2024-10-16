let num = 1
let lastCar 

let preloader = document.querySelector('.preloader')

async function loadCars() {
  let res = await fetch(`./data/cars-${num}.json`);
  let cars = await res.json()
  console.log(cars);
  
  cars.forEach(car => {
    let carCard = document.createElement('div')
    carCard.innerHTML = `
      <div class="table__cell">${car.Name}</div>
      <div class="table__cell">${car.Acceleration}</div>
      <div class="table__cell">${car.Cylinders
}</div>
      <div class="table__cell">${car.Displacement}</div>
      <div class="table__cell">${car.Horsepower}</div>
      <div class="table__cell">${car.Weight_in_lbs}</div>
      <div class="table__cell">${car.Miles_per_Gallon}</div>
      <div class="table__cell">${car.Year
}</div>
      <div class="table__cell">${car.Origin}</div>
    `
    carCard.className = 'table__row'
    
    document.querySelector('.table').append(carCard)
  })

  preloader.style.display = 'none'

  num++
  lastCar = document.querySelector('.table__row:last-child')

  if(lastCar) {
    observerCar.observe(lastCar);
  }
}

loadCars(num)

function checkCar(entries, observer) {
  entries.forEach(item => {
    if(item.isIntersecting) {

      if(num == 6) {
        return
      }

      observer.unobserve(item.target)
      preloader.style.display = 'block'
      setTimeout(() => {
        loadCars(num)
      }, 1000);
    }
  })
}

var options = {
  rootMargin: "50px",
};

var observerCar = new IntersectionObserver(checkCar, options)
