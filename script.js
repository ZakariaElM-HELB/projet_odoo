const posts = JSON.parse(localStorage.getItem("posts")) || [
  { id: 1, image: "assets/img/monkey1.avif", comments: ["😂", "🙉", "🍌"] },
  { id: 2, image: "assets/img/monkey2.jpg", comments: ["🐒", "🎉", "🍍"] },
  { id: 3, image: "assets/img/monkey3.png", comments: ["❤️", "😂", "🙈"] },
];

let reposts = JSON.parse(localStorage.getItem("reposts")) || [];
let videoStream;

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  posts.forEach(post => {
    const postHTML = `
      <div class="col-md-8 mx-auto">
        <div class="card">
          <img src="${post.image}" class="card-img-top" alt="Post Image">
          <div class="card-body">
            <div class="action-buttons">
              <button onclick="generateBananas()">🍌</button>
              <button onclick="repost(${post.id})">🔄</button>
            </div>
            <div class="comments-section">
              ${post.comments.map(comment => `
                <div class="comment">
                  <img src="assets/img/monkeySelfie1.jpg" alt="User">
                  <div class="comment-text">${comment}</div>
                </div>
              `).join("")}
              <div class="emoji-picker">
                <button onclick="addEmojiComment(${post.id}, '😂')">😂</button>
                <button onclick="addEmojiComment(${post.id}, '🙉')">🙉</button>
                <button onclick="addEmojiComment(${post.id}, '🍌')">🍌</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    postContainer.innerHTML += postHTML;
  });
}

function openCamera() {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("video");
  videoContainer.style.display = "flex";
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      videoStream = stream;
      video.srcObject = stream;
    })
    .catch(err => alert("Erreur d'accès à la caméra : " + err.message));
}

function closeCamera() {
  const videoContainer = document.getElementById("video-container");
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
  }
  videoContainer.style.display = "none";
}

function capturePhoto() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageUrl = canvas.toDataURL("image/png");

  posts.unshift({ id: posts.length + 1, image: imageUrl, comments: [] });
  savePosts();
  loadPosts();
  closeCamera();
}

function repost(postId) {
  const post = posts.find(p => p.id === postId);
  if (!reposts.some(r => r.id === postId)) {
    reposts.push(post);
    localStorage.setItem("reposts", JSON.stringify(reposts));
    showNotification("👍🔄");
  } else {
    showNotification("⚠️ Déjà reposté !");
  }
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 3000);
}

function generateBananas() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const banana = document.createElement("div");
      banana.classList.add("banana");
      banana.textContent = "🍌";

      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * document.documentElement.scrollHeight;

      banana.style.left = `${randomX}px`;
      banana.style.top = `${randomY}px`;

      document.body.appendChild(banana);

      setTimeout(() => banana.remove(), 3000);
    }, i * 50);
  }
}

function addEmojiComment(postId, emoji) {
  const post = posts.find(post => post.id === postId);
  post.comments.push(emoji);
  savePosts();
  loadPosts();
}

document.addEventListener("DOMContentLoaded", loadPosts);
