// Ustawia motyw przed pierwszym malowaniem, żeby nie było mignięcia.
export function SkryptMotywu() {
  const kod = `try{var m=localStorage.getItem("ep-motyw");if(m)document.documentElement.dataset.theme=m==="ciemny"?"dark":"light"}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: kod }} />;
}
