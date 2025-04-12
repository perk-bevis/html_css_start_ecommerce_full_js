// trả về 1 đói tượng dom
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputNameSelector = document.querySelector(".name");
const inputEmailSelector = document.querySelector(".email");
const inputPasswordSelector = document.querySelector(".password");

const inputAllSeclector = document.querySelectorAll(".form-group input");

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const errorMessageAll = document.querySelectorAll('.error_message');
// function xử lí sự kiện cạy lần đầu khi load
function handleSignUpClick(event) {
    // event.preventDefault(); = Ngăn hành vi mặc định của trình duyệt.
    // // Dùng trong các sự kiện như: submit, click, keydown, drag, v.v.
    event.preventDefault();
    let isFormValid = true;
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
            let isRequireValid = requireValidate (inputSelector ,name);
            if(isRequireValid){
                showSucces(inputSelector,divMessageSelector);   
            }
        } else if (name === "email") {
            let isRequireValid = requireValidate (inputSelector ,name);
            let isMinLengthValid;
            if(isRequireValid){
                // validate email tối thiểu 3 kí tự
                isMinLengthValid = minLengthValidate(inputSelector ,name ,'nhap email tối thiểu 3 kí tụ');
            }
            // validate email
            let isEmailRegexValid;
            if(isRequireValid && isMinLengthValid){
                isEmailRegexValid = emailRegexValidate(inputSelector ,name);
            }
            // validate khác
            // check validate success 
            if(isRequireValid && isMinLengthValid  && isEmailRegexValid){
                showSucces(inputSelector,divMessageSelector);
            }
        } else if (name === "password") {
            let isRequireValid = requireValidate (inputSelector ,name);
            let isMinLengthValid;
            // validate email tối thiểu 8 kí tự
            if(isRequireValid){
                isMinLengthValid =  minLengthValidate(inputSelector ,name ,'password tối thiểu 8 kí tụ cho bảo mật ')
            }
            
            // CHECK SUCCEST    
            if(isRequireValid && isMinLengthValid){
                showSucces(inputSelector,divMessageSelector);
            }
        }else{
            let isRequireValid = requireValidate (inputSelector ,name);
            let isMinLengthValid;
            let isCompareValid;
            // validate email tối thiểu 8 kí tự
            if(isRequireValid){
                isMinLengthValid =  minLengthValidate(inputSelector ,name ,'confirm password tối thiểu 8 kí tụ cho bảo mật ')
            }

            if(isRequireValid && isMinLengthValid){
                // valiidate compare with password
                isCompareValid = requireValidateCompare(inputSelector,name);
            }
            // CHECK SUCCEST    
            if(isRequireValid && isMinLengthValid && isCompareValid){
                showSucces(inputSelector,divMessageSelector);
            }
        }
        
    }

    // kiểm tra ko có ô input nào có lỗi validate
    // lưu user vào localstorage
    for(let i = 0;i<errorMessageAll.length;i++){
        if(errorMessageAll[i].textContent !== ''){
            isFormValid =false;
            break;
        }
    }
    if(isFormValid){
        console.log('to page login');
    }

}
function showSucces(inputSelector,divMessageSelector){
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