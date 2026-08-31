
const LoadingState = {

  tabelRow(kolomCount = 5, barisCount = 3) {
    let rowsHtml = '';
    for (let i = 0; i < barisCount; i++) {
      let colsHtml = '';
      for (let j = 0; j < kolomCount; j++) {
        colsHtml += `<td><div class="skeleton-box skeleton-text" style="width: ${60 + (j * 8)}%;"></div></td>`;
      }
      rowsHtml += `<tr>${colsHtml}</tr>`;
    }
    return rowsHtml;
  },

  daftarList(itemCount = 3) {
    let itemsHtml = '';
    for (let i = 0; i < itemCount; i++) {
      itemsHtml += `
        <div class="item-balita">
          <div class="item-balita-main">
            <div class="skeleton-box" style="width: 42px; height: 42px; border-radius: 50%;"></div>
            <div class="item-balita-info" style="flex: 1;">
              <div class="skeleton-box skeleton-title" style="width: 50%;"></div>
              <div class="skeleton-box skeleton-text" style="width: 75%;"></div>
            </div>
          </div>
        </div>
      `;
    }
    return itemsHtml;
  }
};

window.LoadingState = LoadingState;
