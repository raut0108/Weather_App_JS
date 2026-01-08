
let target = ''
const temp = document.querySelector('.temp')
const LocationTime = document.querySelector('.time_location > p')
const LocationName = document.querySelector('.time_location > span')
const weatherConditionImg = document.querySelector('.weather_condition img')
const weatherConditionField = document.querySelector('.weather_condition span') 
const searchField = document.querySelector('.searchField')
const form = document.querySelector('form')
form.addEventListener('submit',search)

function search(event){
   event.preventDefault();
   target = searchField.value
   fetchData(target)
}
async function fetchData(target){
   
    try{
         const url = `https://api.weatherapi.com/v1/current.json?key=01f701553ee146d39c7111155252212&q=${target}&aqi=yes`
         const response = await fetch(url)
         console.log(response)
         const data = await response.json()
         console.log(data)
         if(data.error)
         {
            throw new Error(data.error.message)
         }
         
         const tempr = data.current.temp_c
         const timel = data.location.localtime
         const lname = data.location.name
         const icon =  data.current.condition.icon
         const condText = data.current.condition.text
         
         console.log(`The temperature in ${lname} is ${tempr}°C . The weather is ${condText} . Local time is ${timel} `)

        updateDom(tempr,timel,lname,icon,condText)

          
       }
       catch(error){
        console.log(error)
       }
    
}

function updateDom(tempr,timel,lname,icon,condText){
    temp.innerText = `${tempr}°C`
    LocationName.innerText = lname
    weatherConditionImg.src = icon
    weatherConditionField.innerText  = condText
    const exactTime = timel.split(' ')[1]
    const exactDate = timel.split(' ')[0]
    const exactDay = new Date(exactDate).getDay()
    LocationTime.innerText = `${exactTime}  ${exactDate}  ${getExactDay(exactDay)}`


}

function getExactDay(n)
{
    console.log(n)
    switch(n){
        case 0 : return 'Sunday'
        case 1 : return 'Monday'
        case 2 : return 'Tuesday'
        case 3 : return 'Wednesay'
        case 4 : return 'Thursday'
        case 5 : return 'Fridayday'
        case 6 : return 'Saturday'
        default :'Invalid Day' 
    }
}

fetchData(target)