// trả về 1 đói tượng dom
const btnSignUpSelector = document.querySelector(".btn-signup");

const inputAllSeclector = document.querySelectorAll(".form-group input");

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const errorMessageAll = document.querySelectorAll('.error_message');
// function xử lí sự kiện cạy lần đầu khi load
function handleSignUpClick(event) {
    // event.preventDefault(); = Ngăn hành vi mặc định của trình duyệt.
    // // Dùng trong các sự kiện như: submit, click, keydown, drag, v.v.
    event.preventDefault();
    //1 thực hiện validate
    // i = 0  i < 3
    for (let i = 0; i < inputAllSeclector.length; i++) {
        let inputSelector = inputAllSeclector[i];
        let valueInput = inputSelector.value;

        //.closest() sẽ đi từ chính phần tử đó, sau đó đi lên cha, ông, ông cố... cho đến khi tìm thấy phần tử phù hợp.
        // Nếu không tìm thấy, nó sẽ trả về null.

        let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
        
        let name = inputSelector.name;
        // validate not empty
        if (name === 'name') {
            // require
            if(!require(inputSelector)){
                // show error
                showError(inputSelector, 'tên không được để trống');
            }else{
                // show success
                showSucces(inputSelector);
            }
            
        } else if (name === "email") {
            //1. require
            //2. minlength
            //3. regex validate email
            
            
        } else if (name === "password") {
            //1. require
            //2. minlength
        }else{
            //1. require
            //2. minlength
            //3. compare pass
            // CHECK SUCCEST    
            
        }
        
    }

    // kiểm tra ko có ô input nào có lỗi validate
    // lưu user vào localstorage

}


// ruler require
// 
function require(inputSelector){
    return inputSelector.value ? true :false;
}

function showError(inputSelector ,message = null){
    // kiểm thị màu đỏ cho ô input
    inputSelector.classList.add('error');
    // thêm nội dung lỗi cho div message dưới ô input
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
    divMessageSelector.textContent = message;
}

function showSucces(inputSelector){
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
    inputSelector.classList.remove("error");
    divMessageSelector.textContent = '';
}

// rule compare data
function requireValidateCompare(inputSelector,name,message){
    let ivaLid = true;
    let valueInput = inputSelector.value;
    let compareSelectorClass = inputSelector.getAttribute('selection_compare');
    let compareSelector = document.querySelector('.' + compareSelectorClass);
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
    if(compareSelector.value !== valueInput){
        ivaLid = false;
        inputSelector.classList.add("error");
        // hiển thị message lỗi
        let messageError ='dữ liệu nhập ở '+ name + " không trùng vs dữ liwwju nhập ở" + compareSelectorClass;
        if(message){
            messageError = message;
        }
        // Hiển thị nội dung lỗi (messageError) vào phần tử thông báo lỗi.
        divMessageSelector.textContent = messageError;
    } 
    return ivaLid;
}


// rule require validate
function requireValidate (inputSelector ,name ,message){
    //1) kiểm tra xem ruler có hợp lệ hay k
    //2) nếu ko hợp lệ hiển thị thông báo lỗi ở ô input
    let ivaLid = true;
    let valueInput = inputSelector.value;
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
    if (valueInput === '') {
        ivaLid =false;
        // thêm viền đỏ cho input
        inputSelector.classList.add("error");
        // hiển thị message lỗi
        let messageError = name + " không được để trống";
        if(message){
            messageError = message;
        }
        // Hiển thị nội dung lỗi (messageError) vào phần tử thông báo lỗi.
        divMessageSelector.textContent = messageError;
    }
    return ivaLid;
}
// rule value email
function emailRegexValidate(inputSelector ,name ,message){
    let ivaLid = true;
    let valueInput = inputSelector.value;
    let isvalidRegex = regexEmail.test(valueInput);
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
    if(!isvalidRegex){
        ivaLid =false;
        inputSelector.classList.add("error");
        let messageError = name + " không phải định dạng email hợp lệ";
        if(message){
            messageError = message;
        }
        divMessageSelector.textContent = messageError;
    }
    return ivaLid;
}

function minLengthValidate(inputSelector, name ,message){
    let ivaLid = true;
    let valueInput = inputSelector.value;
    let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");

    // optional
    let minLength = inputSelector.getAttribute("min_length");
    if (valueInput.length < minLength) {
        ivaLid =false;
        let messageError = name + " tối thiểu " + minLength + " kí tự";
        if(message){
            messageError = message;
        }
        // Hiển thị nội dung lỗi (messageError) vào phần tử thông báo lỗi.
        divMessageSelector.textContent = messageError;
    }
    return ivaLid;
}
// tên sự kiện
btnSignUpSelector.addEventListener("click", handleSignUpClick);