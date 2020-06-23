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
    
    // calulate of price
    let unitPrice = +($(`#unitPrice${num}`).text());
    let price = unitPrice * countFood;
    $(`#price${num}`).text(price);
 
});



