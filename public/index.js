// index.js (public 폴더 안)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/여기에1IVWQDvzsBU5kP0pvWpDTiu45HX1a4s6H6MR764C_XS0URL/exec";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("go-cinema").addEventListener("click", () => {
    console.log("🎬 영화관으로 이동");
    showCinema(); // 실제로는 네가 영화관 섹션 보여주는 함수
  });

  document.getElementById("go-room").addEventListener("click", () => {
    console.log("🏠 내 방으로 이동");
    showRoom();
  });

  document.getElementById("go-polaroid").addEventListener("click", () => {
    console.log("📷 폴라로이드로 이동");
    showPolaroid();
  });
});
showResult(scores);

function show(sectionEl) {
  const allViews = [viewHome, viewRoom, viewCinema, viewPolaroid, viewResult];
  allViews.forEach(v => {
    if (!v) return;
    v.classList.toggle("hidden", v !== sectionEl);
  });
}
// 홈에서 "폴라로이드 찍기" 버튼 눌렀을 때
document.getElementById("go-polaroid").addEventListener("click", () => {
  show(viewPolaroid);
  initPolaroid(); // ← 여기서 카메라 켜고 5초 카운트다운 들어감
});

// 결과 화면에서 "홈으로" 버튼
function showHome(){
  stopStreams(); // 혹시 아직 켜져있다면 끄기
  show(viewHome);
}
if (!backStream && frontStream) {
  backCamFullVideo.srcObject = frontStream;
}
// 🎬 영화관 다중 선택 모드
let selectedChoices = []; // 현재 질문에서 선택된 보기 index 목록

function loadQuestion(i) {
  const q = QUESTIONS[i];
  currentQ = i;
  selectedChoices = [];

  // 비디오 세팅
  elVideo.pause();
  elVideoSrc.src = q.video;
  elVideo.load();
  elVideo.play().catch(()=>{});

  // 텍스트 넣기
  elScenario.textContent = q.scenarioTitle;
  elQuestion.textContent = q.description;
  elIndicator.textContent = (i+1) + " / " + QUESTIONS.length;

  // 보기 버튼들 구성
  elChoices.innerHTML = "";
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="choice-text">${choice.text}</span>`;

    // ✅ 클릭 시 선택/해제만 토글 (즉시 이동 X)
    btn.addEventListener("click", () => {
      const pos = selectedChoices.indexOf(idx);
      if (pos >= 0) {
        // 이미 선택되어 있으면 해제
        selectedChoices.splice(pos, 1);
        btn.classList.remove("selected");
      } else {
        // 새로 선택
        selectedChoices.push(idx);
        btn.classList.add("selected");
      }
    });

    elChoices.appendChild(btn);
  });

  // 버튼 텍스트 조정
  const nextBtn = document.getElementById("cinema-next-btn");
  nextBtn.textContent = (i === QUESTIONS.length - 1) ? "결과 보기 ▶" : "다음으로 ▶";
}

// 🎯 "다음으로 ▶" 버튼 클릭 시만 점수 적용 + 다음으로 이동
document.getElementById("cinema-next-btn").addEventListener("click", () => {
  if (selectedChoices.length === 0) {
    alert("하나 이상 선택해주세요!");
    return;
  }

  const q = QUESTIONS[currentQ];
  selectedChoices.forEach(idx => applyScore(q.choices[idx].score));

  if (currentQ < QUESTIONS.length - 1) {
    loadQuestion(currentQ + 1);
  } else {
    // 마지막 질문이면 결과로
    showSection(viewResult);
    drawEnneaChart(scores);
  }
});
