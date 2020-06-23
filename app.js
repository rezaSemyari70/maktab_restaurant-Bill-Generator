//************** Calculate Price Of Any Food ****************

// --------- When Increse Count Of Food ----------
$(document).on("click", "[id^=increase]", function () {
    
    //get id selected
    let increaseId = $(this).attr('id');
    let num = increaseId.slice(-2);
    
    //increase count of food
    let countFood = +($(`#countFood${num}`).text());
    
    countFood++;
    $(`#countFood${num}`).text(countFood);
    //show minus sign
    $(`#subtract${num}`).removeClass('d-none');
    if(countFood > 0){
        $(`#subtract${num}`).show();
    }
    // calulate of price
    let unitPrice = +($(`#unitPrice${num}`).text());
    let price = unitPrice * countFood;
    $(`#price${num}`).text(price);
 
});

// --------- When Decrease Count Of Food ----------

$(document).on("click", "[id^=subtract]", function () {
    
    //get id selected
    let decreaseId = $(this).attr('id');
    let num = decreaseId.slice(-2);
    
    //decrease count of food
    let countFood = +($(`#countFood${num}`).text());
    countFood--;
    $(`#countFood${num}`).text(countFood);
    //hide minus sign
    if(countFood <= 0){
        $(`#subtract${num}`).hide();
    }
    // calulate of price
    let unitPrice = +($(`#unitPrice${num}`).text());
    let price = unitPrice * countFood;
    $(`#price${num}`).text(price);
 
});

