/** Inline before paint to avoid light/dark flash. Keep in sync with ThemeProvider. */
export const themeInitScript = `(function(){try{var k='fudugo-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t='dark'}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t}catch(e){document.documentElement.classList.add('dark')}})();`;
