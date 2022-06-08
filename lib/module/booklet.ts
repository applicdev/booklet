// ? plausible integration
globalThis.addEventListener('DOMContentLoaded ', () => {
  const node = document.createElement('script');

  node.setAttribute('defer', '');
  node.setAttribute('data-domain', 'applic.dev');
  node.setAttribute('src', 'https://plausible.io/js/plausible.js');

  document.head.appendChild(node);
});
