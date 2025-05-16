// trả về 1 đói tượng dom
const btnSignUpSelector = document.querySelector(".btn-signup");
// Lấy ra *tất cả* các phần tử input nằm bên trong các phần tử có class "form-group".
// Kết quả là một NodeList (một danh sách giống mảng) chứa các đối tượng đại diện cho các ô input
const inputAllSeclector = document.querySelectorAll(".form-group input");

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const errorMessageAll = document.querySelectorAll('.error_message');


//====================== start listener fumction =====================

// function xử lí sự kiện chạy lần đầu khi load (Thực ra là khi nút đăng ký được click)
// Hàm này sẽ được gọi khi người dùng nhấp vào nút đăng ký (btnSignUpSelector).
function handleSignUpClick(event) {

    let isNameValid;
    let isEmailValid;
    let isPassValid;
    let isConfirrmValid;
    // event.preventDefault(); = Ngăn hành vi mặc định của trình duyệt.
    // // Dùng trong các sự kiện như: submit, click, keydown, drag, v.v.
    event.preventDefault();
    //1 thực hiện validate
    // i = 0  i < 3
     // Vòng lặp chạy qua từng phần tử input trong danh sách inputAllSeclector.
    for (let i = 0; i < inputAllSeclector.length; i++) {
        // Lấy ra đối tượng DOM của ô input hiện tại trong vòng lặp.
        let inputSelector = inputAllSeclector[i];
        //let valueInput = inputSelector.value;
        //.closest() sẽ đi từ chính phần tử đó, sau đó đi lên cha, ông, ông cố... cho đến khi tìm thấy phần tử phù hợp.
        // Nếu không tìm thấy, nó sẽ trả về null.
        //let divMessageSelector = inputSelector.closest(".form-group").querySelector(".error_message");
        

        // Lấy giá trị của thuộc tính 'name' của ô input hiện tại (ví dụ: "name", "email", "password").
        let name = inputSelector.name;
        // validate not empty :Kiểm tra giá trị 'name' để gọi hàm validate tương ứng.
        if (name === 'name') {
            isNameValid = validateName(inputSelector);
            
        } else if (name === "email") {
            isEmailValid = valiidateEmail(inputSelector)
        } else if (name === "password") {
            isPassValid = validatePassword(inputSelector);
        }else{
            isConfirrmValid = validateConfirrmPassword(inputSelector);
        } 
    }

    // kiểm tra ko có ô input nào có lỗi validate
    // lưu user vào localstorage
    if(isNameValid && isEmailValid && isPassValid && isConfirrmValid){
        console.log('login succect')
    }
}

// hàm chỉ chạy khi người dùng nhập value có sự thay đổi
// Hàm này được gọi mỗi khi giá trị của một ô input thay đổi (sự kiện 'input').
function handleChangeValue(event){
     // Lấy ra đối tượng DOM của ô input đã kích hoạt sự kiện 'input'.
    let inputSelector = event.target;
    // Lấy giá trị thuộc tính 'name' của ô input đó.
    let nameInput = inputSelector.name;

    if(nameInput === 'name'){
        validateName(inputSelector);
    }else if(nameInput === 'email'){
        valiidateEmail(inputSelector)
    }else if(nameInput === 'password'){
        validatePassword(inputSelector);
    }else if (nameInput === 'confirm_password') { // Thêm điều kiện này
        // Khi nhập vào ô confirm password, thì mới validate nó
        validateConfirrmPassword(inputSelector);
    }
}

//====================== end listener fumction =====================


//====================== start validate input fumction =====================
// Hàm kiểm tra cho ô input tên (name).
function validateName(inputSelector){
    let isValid = false;
     // require
     if(!require(inputSelector)){ // Nếu hàm require trả về false (tức là rỗng)
        // show error
        showError(inputSelector, 'tên không được để trống');
    }else{
        // show success
        showSucces(inputSelector);
        isValid = true;
    }
    return isValid;
}

// Hàm kiểm tra cho ô input email.
function valiidateEmail(inputSelector){
    let isValid = false;
     //1. require
    //2. minlength
    //3. regex validate email
    if(!require(inputSelector)){
        showError(inputSelector , 'email không được để trống');
    }else if(!minlength(inputSelector)){
        showError(inputSelector , `email tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    }else if(!emailRegex(inputSelector)){
        showError(inputSelector , 'email không đúng định dạng');
    }else{
        showSucces(inputSelector);
        isValid = true;
    }
    return isValid;
}
// Hàm kiểm tra cho ô input password.
function validatePassword(inputSelector){
    let isValid = false;
    //1. require
    //2. minlength
    if(!require(inputSelector)){
        showError(inputSelector , 'password không được để trống');
    }else if(!minlength(inputSelector)){
        showError(inputSelector , `password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    }else{
        showSucces(inputSelector);
        isValid = true;
    }
    return isValid;
}

// Hàm kiểm tra cho ô input confirm password.
function validateConfirrmPassword(inputSelector){
    let isValid = false;
    //1. require
    //2. minlength
    //3. compare pass
    // CHECK SUCCEST
    if(!require(inputSelector)){
        showError(inputSelector , 'confirm password không được để trống');
    }else if(!minlength(inputSelector)){
        showError(inputSelector , `confirm password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    }else if(!comparePass(inputSelector)){
        showError(inputSelector , 'confirm password không trùng vs password');
    }
    else{
        showSucces(inputSelector); 
        isValid = true;   
    }
    return isValid;
}
//====================== end validate input fumction =====================

// ruler require
//====================== Start ruler fumction =====================
// Hàm quy tắc: Kiểm tra xem input có giá trị hay không (không được rỗng).
function require(inputSelector){
    return inputSelector.value ? true :false;
}

// Hàm quy tắc: Kiểm tra độ dài tối thiểu của giá trị input.
function minlength(inputSelector){
      // Lấy giá trị của thuộc tính 'min_length' từ thẻ HTML của input.
    let minLength = inputSelector.getAttribute('min_length');
    // Lấy giá trị hiện tại người dùng đã nhập vào ô input.
    let inputValue = inputSelector.value;
     // So sánh độ dài giá trị nhập vào với giá trị minLength yêu cầu
    if(inputValue.length < minLength){
        return false;
    }
    return true;
}

// Hàm quy tắc: Kiểm tra giá trị input có khớp với định dạng email (sử dụng regex đã định nghĩa).
function emailRegex(inputSelector){
     // Lấy giá trị người dùng nhập.
    let inputValue = inputSelector.value;
    // Dùng phương thức test() của regex để kiểm tra chuỗi inputValue. Trả về true nếu khớp, false nếu không.
    return regexEmail.test(inputValue)
}
// Hàm quy tắc: So sánh giá trị của ô confirm password với ô password gốc
function comparePass(inputSelector){
    let valueConfirmPass = inputSelector.value;
    let compareAttributeValue = inputSelector.getAttribute('selection_compare'); // Lấy giá trị attribute
    let selectorToFind = '.' + compareAttributeValue; // Tạo selector

    console.log("Comparing passwords...");
    console.log("Selector being used:", selectorToFind); // In ra selector đang dùng
    console.log("Confirm password input element:", inputSelector); // Kiểm tra input confirm có đúng không

    let passwordSelector = document.querySelector(selectorToFind); // Thực hiện query

    console.log("Result of querySelector:", passwordSelector); // *** QUAN TRỌNG: In ra kết quả tìm kiếm ***

    // Thêm kiểm tra null để tránh lỗi và cung cấp thông tin
    if (passwordSelector === null) {
        console.error("ERROR: Could not find element with selector '" + selectorToFind + "' in the DOM at this moment.");
        // Bạn có thể thử tìm bằng cách khác để kiểm tra xem element có tồn tại không
        // console.log("Trying to find by name=password:", document.querySelector('input[name="password"]'));
        return false; // Trả về false vì không so sánh được
    }

    let valuePassword = passwordSelector.value; // Dòng 146 - Nếu passwordSelector không null thì mới chạy tới đây
    console.log("Password value:", valuePassword);
    console.log("Confirm password value:", valueConfirmPass);
     // So sánh giá trị của ô confirm password và ô password gốc. Trả về true nếu bằng nhau, false nếu khác.
    return valueConfirmPass === valuePassword;
}
// function comparePass(inputSelector){
//     let valueConfirmPass = inputSelector.value;
//     let passwordSelector = document.querySelector('.' + inputSelector.getAttribute('selection_compare'));
//     let valuePassword = passwordSelector.value;
//     return valueConfirmPass === valuePassword
// }

// =============== end ruler fumction =====================




// =============== start message fumction =====================
// Hàm hiển thị trạng thái lỗi cho một ô input.
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


// =============== end message fumction =====================

// tên sự kiện
btnSignUpSelector.addEventListener("click", handleSignUpClick);

// thêm sự kiện input cho các ô input nhập liệu
for (let i = 0; i < inputAllSeclector.length; i++) {
    let inputElement = inputAllSeclector[i];
    inputElement.addEventListener('blur  ', handleChangeValue)
}
