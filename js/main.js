window.onload = function () {
  // if (!document.querySelector(".content-video-list-ul")) return;
  // 비동기 통신을 위해 새로운 xmlhttp 요청 생성
  const xhr = new XMLHttpRequest();
  // 요청 method
  const method = "GET";
  // 파일 위치
  const url = "data/video.json";

  // 위의 method 와 url 로 비동기 요청 초기화
  xhr.open(method, url);
  // 요청 헤더 설정
  xhr.setRequestHeader("Content-Type", "application/text");
  // 요청 동작 설정
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      // 요청 상태가 OK 이면
      if (xhr.status === 200) {
        // Json 객체 형태로 응답 받기
        const resJson = JSON.parse(xhr.responseText);
        const videoData = resJson.videos;
        console.log(resJson)
        let videoList = document.querySelector(".content-video-list-ul");
        let videoItem ='<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">';

        for (let i = 0; i < resJson.length; i++) {
          videoItem += `
            <div class="col">
              <div class="card shadow-sm">
                <iframe width="100%" height="225" src="${resJson[i]["url"]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="card-body">
                  <p class="card-text"><b>${resJson[i]["title"]}</b></p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-info">${resJson[i]["part"]}</button>
                    </div>
                    <small class="text-muted">${resJson[i]["channelName"]}</small>
                  </div>
                </div>
              </div>            
            </div>
            `;
          
        }
        videoItem += '</div>';
        videoList.innerHTML = videoItem;
      }
    }
  };
  // 요청 보내기
  xhr.send();
};

// const URL = "data/video.json";
// window.onload = function() {
//   const xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function() {
//     if(xhr.readyState == xhr.DONE) {
//       if(xhr.status == 200) {
//         const imgSrc = JSON.parse(xhr.response)['message']
//         const imgTag = document.querySelector("#dog-img")
//         imgTag.src = imgSrc;

//       }
//     }
//   }

//   xhr.open("GET", URL)
//   xhr.send()  
// }


function review_regist() {
  let name = document.getElementById("writer").value;
  let title = document.getElementById("title").value;
  let review = document.getElementById("review").value;


  if (!name || !title || !review) {
    alert("빈칸이 없도록 입력해주세요.");
    return;
  } else {
    let dataArray = []
    let data = {};
    data.title = title;
    data.review = review;
    dataArray.push(data);

    localStorage.setItem(name, JSON.stringify(dataArray));
    alert("리뷰 등록 성공!");
    window.location.replace("review_regist.html");
  }
}

function login() {
  let id = document.getElementById("id").value;
  let password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    user.id &&
    user.password &&
    user.id === id &&
    user.password === password
  ) {
    alert("로그인 성공 !");
    window.location.replace("index.html");
  } else {
    alert("로그인 실패 !");
  }
}

function regist(){
  window.location.replace("review_regist.html");
}

function cancel(){
  window.location.replace("review.html");
}

function modify(){
  window.location.replace("review_modify.html");
}

