const fs = require('fs');
const path = require('path');

const getFileSlug = (filePath, contentPath = 'src/documentation') => {
  const filename = filePath.replace(`${contentPath}/`, '');
  return filename.replace(new RegExp(path.extname(filePath) + '$'), '');
};

export default getFileSlug;
