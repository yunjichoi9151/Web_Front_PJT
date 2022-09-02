window.onload = function () {
  if (!document.querySelector(".content-video-list col-10")) return;
  // 비동기 통신을 위해 새로운 xmlhttp 요청 생성
  const xhr = new XMLHttpRequest();
  // 요청 method
  const method = "GET";
  // 파일 위치
  const url = "/data/video.json";

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
        let videoList = document.querySelector(".content-video-list col-10");
        for (let i = 0; i < videoData.length; i++) {
          let videoItem = `
            <li>
              <div class="list-item">
                <div>
                  <img src="${videoData[i]["img"]}" alt="" />
                </div>
                <div class="user-info">
                  <div>
                    <div>${videoData[i]["id"]}</div>
                    <div>${videoData[i]["title"]}</div>
                    <div>${videoData[i]["part"]}</div>
                    <div>${videoData[i]["channelName"]}</div>
                    <div>${videoData[i]["url"]}</div>
                  </div>
                </div>
              </div>
            </li>
            `;
          videoList.innerHTML += videoItem;
        }
      }
    }
  };
  // 요청 보내기
  xhr.send();
};

function review_regist() {
  let title = document.getElementById("title").value;
  let review = document.getElementById("review").value;


  if (!title || !review) {
    alert("빈칸이 없도록 입력해주세요.");
    return;
  } else {
    const userreview = {
      title: title,
      review: review,
    };

    localStorage.setItem("userreview", JSON.stringify(userreview));
    alert("리뷰 등록 성공!");
    window.location.replace("review.html");
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