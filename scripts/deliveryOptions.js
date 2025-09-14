import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:999
}]

export function getDeliveryOption(deliveryOptionId){
    let matchingDeliveryOption;
    deliveryOptions.forEach((deliveryOption)=>{
        if(deliveryOption.id===deliveryOptionId)
            matchingDeliveryOption=deliveryOption
    })
    return matchingDeliveryOption;
}

export function calculateDeliveryDate(deliveryOption){
    const deliveryExpected=dayjs().add(deliveryOption.deliveryDays,'days');
    console.log(deliveryExpected);
    let deliveryDay=deliveryExpected;
    if(isWeekend(deliveryExpected)==='Saturday'){
        deliveryDay=deliveryExpected.subtract(1,'days')
    }
    else if(isWeekend(deliveryExpected)==='Sunday'){
        deliveryDay=deliveryExpected.add(1,'days')
    }    
    return deliveryDay.format("dddd, MMMM D");
}

function isWeekend(day){
    if (day.format('dddd')==='Saturday'){
        return 'Saturday';
    }
    else if(day.format('dddd')==='Sunday'){
        return 'Sunday';
    }
    else
    {
        return 'Weekday';
    }
}