export const analyticsQueues = `window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
window.gtag("js",new Date());
window.gtag("config","G-6JC9JR7TQ0");
window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
window.ym.l=1*new Date();
window.ym(98874723,"init",{defer:true,clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
window._tmr=window._tmr||[];`;

export const analyticsLoaders = `(function(){
function loadAnalytics(){
var sources=[
  ["google-analytics","https://www.googletagmanager.com/gtag/js?id=G-6JC9JR7TQ0"],
  ["yandex-metrica","https://mc.yandex.ru/metrika/tag.js"],
  ["tmr-code","https://top-fwz1.mail.ru/js/code.js"]
];
sources.forEach(function(source){
  if(document.getElementById(source[0]))return;
  var script=document.createElement("script");
  script.async=true;
  script.id=source[0];
  script.src=source[1];
  document.head.appendChild(script);
});
}
window.addEventListener("pointerdown",loadAnalytics,{capture:true,once:true});
window.addEventListener("keydown",loadAnalytics,{capture:true,once:true});
window.setTimeout(loadAnalytics,5000);
})();`;
