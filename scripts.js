var navigationHTML = 
`
  <nav>
    <h2>Smart <span>Home</span></h2>
    <a href="https://nikkoweber.github.io/capella_web_application_dev2/index.html">Geolocation</a>
    <a href="https://nikkoweber.github.io/capella_web_application_dev2/interests.html">Interests</a>
  </nav>
`;

function onLoad() {
    document.getElementById("nav").innerHTML = navigationHTML;
}