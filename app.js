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
    if (countFood > 0) {
        $(`#subtract${num}`).show();
    }
    // calulate of price
    let unitPrice = +($(`#unitPrice${num}`).text());
    let price = unitPrice * countFood;
    $(`#price${num}`).text(price);
    totalOrder()
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
    if (countFood <= 0) {
        $(`#subtract${num}`).hide();
    }
    // calulate of price
    let unitPrice = +($(`#unitPrice${num}`).text());
    let price = unitPrice * countFood;
    $(`#price${num}`).text(price);
    totalOrder()
});

// --------- Total Orders ----------

function totalOrder() {
    let totalOrders = 0;
    $.each($('[id^=price]'), function (index, element) {
        totalOrders += +($(this).text());
    });

    $('#totalOrder').text(totalOrders);
    bill();
}



// **************** discount ****************

$('#usingDiscount').click(function (e) {

    $('#discountCode').removeClass();

    let textCode = $('#discountCode').val();
    if (textCode == 'maktab34') {
        correctMode();
    } else if (textCode != 'maktab34' && textCode != '') {
        $('#discountCode').addClass('wrong');
    } else if (textCode == '') {
        $('#discountCode').addClass('empty');
    }

    $("#trash").click(function (e) {
        removeCode();
    });
    bill();
});



// ----------- Correct Discount Code -----------
function correctMode() {
    $('button i').remove();
    $('#usingDiscount').append(`<i id="trash" class="fa fa-trash text-white"></i>`).css('background-color', '#e74c3c');
    $('#discountCode').addClass('correct');
    $('#discount').text($('#totalOrder').text() * 0.09)
}

// ----------- Remove Discount Code --------------
function removeCode() {
    $('#discountCode').val('')
    $('button i').remove();
    $('#usingDiscount').append(`<i class="fa fa-plus text-white"></i>`).css('background', '#f39c12')
    $('#usingDiscount').css('background-color', '#f39c12');
    $('#discount').text(0)
}

// --------------  Calculat Total Price ----------------
function bill() {
    let priceOrders = +($('#totalOrder').text());
    let serve = +($('#serve').text());
    let discount = +($('#discount').text());
    let totalPrice = (priceOrders + serve - discount);

    $('#totalPrice').text(totalPrice);
}