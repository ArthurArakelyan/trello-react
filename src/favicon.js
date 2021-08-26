const favicon = (color, image, selected) => {
  let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="128" height="128">
      <rect x="10%" y="10%" width="20" height="20" fill="#ffffff" />
      <pattern id="p1" patternUnits="userSpaceOnUse" width="100%" height="13.5">
        <image href="${image}" width="100%" height="13.5" />
      </pattern>
      <path style="fill: ${
        color && selected === "color" ? color
          : image && selected === "image" ? 'url(#p1)'
          : color
      }" fill-rule="evenodd" class="icon" d="M24 3L24 21C24 22.66 22.66 24 21 24L3 24C1.34 24 0 22.66 0 21L0 3C0 1.34 1.34 0 3 0L21 0C22.66 0 24 1.34 24 3ZM10.44 4.56C10.44 3.76 9.79 3.12 9 3.12L4.56 3.12C3.76 3.12 3.12 3.76 3.12 4.56L3.12 18.18C3.12 18.97 3.76 19.62 4.56 19.62L9 19.62C9.79 19.62 10.44 18.98 10.44 18.18L10.44 4.56ZM20.88 12.18L20.88 4.56C20.88 3.76 20.24 3.12 19.44 3.12L15 3.12C14.21 3.12 13.56 3.76 13.56 4.56L13.56 12.18C13.56 12.97 14.21 13.62 15 13.62L19.44 13.62C20.23 13.62 20.88 12.97 20.88 12.18Z"/>
    </svg>
  `;

  const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

  svg = svg.replace(/>\s{1,}</g, `><`);
  svg = svg.replace(/\s{2,}/g, ` `);

  return `data:image/svg+xml,${svg.replace(symbols, encodeURIComponent)}`;
}

export default favicon;
