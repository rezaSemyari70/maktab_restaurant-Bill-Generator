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
    let price = separateNumber(unitPrice * countFood);
    $(`#price${num}`).text(price);

    totalOrder()
    calcuteDiscount()
    bill();
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
    let price = separateNumber(unitPrice * countFood);
    $(`#price${num}`).text(price);
    totalOrder()
    calcuteDiscount()
    bill();
});

// --------- Total Orders ----------

function totalOrder() {
    let totalOrders = 0;
    $.each($('[id^=price]'), function (index, element) {
        totalOrders += +($(this).text().replace('/', ''));
    });

    $('#totalOrder').text(separateNumber(totalOrders));
}


// **************** discount ****************
const discountCodes = {
    codeOff1: '$maktabLowOff',
    codeOff2: '$maktabMidOff',
    codeOff3: '$maktabHighOff'
}

$('#usingDiscount').click(function (e) {

    $('#discountCode').removeClass();
    $('#discountCodeBox input').css('border', '1px solid #e67e22');
    let textCode = $('#discountCode').val();
    if (textCode == discountCodes.codeOff1 || textCode == discountCodes.codeOff2 || textCode == discountCodes.codeOff3) {
        correctMode();
    } else if (textCode != discountCodes.codeOff1 || textCode != discountCodes.codeOff2 || textCode != discountCodes.codeOff3) {
        if (textCode != '') {
            $('#discountCode').addClass('wrong');
            $('#discountCodeBox input').css('border', '1px solid red');
        } else {
            $('#discountCode').addClass('empty');
        }
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
    $('#discountCodeBox input').css('border', '1px solid red');
    $('#discountCode').addClass('correct');

    calcuteDiscount()
}

// -------  Calcute Dicount --------

function calcuteDiscount() {

    let priceOrders = +($('#totalOrder').text().replace('/', ''));
    let textCode = $('#discountCode').val();

    if (textCode == discountCodes.codeOff1) {
        $('#discount').text(separateNumber(priceOrders * 0.12))
    } else if (textCode == discountCodes.codeOff2) {
        $('#discount').text(separateNumber(priceOrders * 0.2))
    } else if (textCode == discountCodes.codeOff3) {
        $('#discount').text(separateNumber(priceOrders * 0.5))
    }
}

// ----------- Remove Discount Code --------------
function removeCode() {
    $('#discountCode').val('')
    $('button i').remove();
    $('#discountCodeBox input').css('border', '1px solid #e67e22');
    $('#usingDiscount').append(`<i class="fa fa-plus text-white"></i>`).css('background', '#f39c12')
    $('#usingDiscount').css('background-color', '#f39c12');
    $('#discount').text(0)
}

// --------------  Calculat Total Price ----------------
function bill() {
    let priceOrders = +($('#totalOrder').text().replace('/', ''));
    let serve = +($('#serve').text().replace('/', ''));
    let discount = +($('#discount').text().replace('/', ''));
    let totalPrice = ((priceOrders + serve) - discount);
   
    $('#totalPrice').text(separateNumber(totalPrice));
}


// -------- Function For Separate 3 Digits ---------

function separateNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1/')
}