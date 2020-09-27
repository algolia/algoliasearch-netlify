export function addCss(css: string, $mainStyle: HTMLElement | null = null) {
  const $usedSibling =
    $mainStyle ??
    document.querySelector(
      'link[rel=stylesheet][href*="algoliasearchNetlify"]'
    ) ??
    document.getElementsByTagName('head')[0].lastChild!;
  const $styleTag = document.createElement('style');
  $styleTag.setAttribute('type', 'text/css');
  $styleTag.appendChild(document.createTextNode(css));
  return $usedSibling.parentNode!.insertBefore(
    $styleTag,
    $usedSibling.nextSibling
  );
}
