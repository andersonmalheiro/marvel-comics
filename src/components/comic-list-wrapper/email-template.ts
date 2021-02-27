import { Comic } from 'api';

export const template = (body: Comic[]) => {
  return `
    <ul style="margin: 0; padding: 0; list-style: none">
      ${body.map((comic) => {
        return `
          <li style="padding: 5px 0; display: flex; align-items: center; justify-content: space-between;">
            <img style="height: 250px; width: auto" src="${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}" />
            <div style="display: flex; flex-direction: column; gap: 1em;">
              <span>
                <b>Title:</b> ${comic.title}
              </span>
              <span>
                <b>Issue:</b> ${comic.issueNumber}
              </span>
            </div>
          </li>
        `;
      })}
    </ul>
  `;
};
