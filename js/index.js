
var websiteNameInput = document.getElementById("siteName");
var websiteUrlInput = document.getElementById("siteUrl");
var lightBox = document.getElementById("lightBox");



var websitesList = [];

if (localStorage.getItem("websiteContainer") !== null) {
    websitesList = JSON.parse(localStorage.getItem("websiteContainer"));
    displayData();
}


function addWebsite() {

    if (validationName() && validationUrl()) {
        var website = {
            name: websiteNameInput.value.trim(),
            Link: websiteUrlInput.value.trim()
        }

        websitesList.push(website);

        localStorage.setItem("websiteContainer", JSON.stringify(websitesList));

        displayData();

        console.log(websitesList);

        websiteNameInput.classList.remove("is-valid");
        websiteUrlInput.classList.remove("is-valid");

        clearForm();

    }
    else {
        lightBox.classList.remove("d-none")
    }
}


function clearForm() {
    websiteNameInput.value = null;
    websiteUrlInput.value = null;
}



function displayData() {
    var cartona = "";

    for (var i = 0; i < websitesList.length; i++) {
        cartona += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${websitesList[i].name}</td>
                            <td><a class="btn btn-success" href="${websitesList[i].Link}" target="_blank"><i
                                        class="fa-regular fa-eye"></i> Visit</a></td>
                            <td><button onclick="deleteItem(${i})" class="btn btn-danger id="deleteBtn"><i class="fa-solid fa-trash"></i> Delete</button>
                            </td>
                        </tr>
        `
    }

    document.getElementById("rowData").innerHTML = cartona;


}



function deleteItem(index) {
    websitesList.splice(index, 1);

    localStorage.setItem("websiteContainer", JSON.stringify(websitesList));

    console.log(websitesList);

    displayData();
}

function validationName() {
    var text = websiteNameInput.value;
    var regex = /^[a-zA-Z _-]{3,15}$/;
    var msgName = document.getElementById("msgName");
    if (regex.test(text)) {
        websiteNameInput.classList.add("is-valid");
        websiteNameInput.classList.remove("is-invalid");
        msgName.classList.add("d-none");
        return true;
    }
    else {
        websiteNameInput.classList.add("is-invalid");
        websiteNameInput.classList.remove("is-valid");
        msgName.classList.remove("d-none");
        return false;
    }
}


function validationUrl() {
    var text = websiteUrlInput.value;
    var regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/;

    var msgUrl = document.getElementById("msgUrl");
    if (regex.test(text)) {
        websiteUrlInput.classList.add("is-valid");
        websiteUrlInput.classList.remove("is-invalid");
        msgUrl.classList.add("d-none");
        return true;
    }
    else {
        websiteUrlInput.classList.add("is-invalid");
        websiteUrlInput.classList.remove("is-valid");
        msgUrl.classList.remove("d-none");
        return false;
    }
}

function closeBox() {
    lightBox.classList.add("d-none");
}

document.addEventListener("click", function (e) {
    if (e.target === lightBox) {
        closeBox()
    }
})


