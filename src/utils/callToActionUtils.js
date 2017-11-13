export default function getCallToActionLink() {
  const links = ['/share/interview', '/share/work-experiences'];
  return links[Math.floor(Math.random() * links.length)];
}
