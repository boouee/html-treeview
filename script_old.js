function displayTable(item) {
  const tableContainer = document.getElementById('table-container');
  const children = Array.from(liElement.querySelectorAll(':scope > ul > li'));
  if (children.length === 0) return;

  const hasItemColumn = children.some(child => child.hasAttribute('item'));
  const hasAVColumn = children.some(child => child.hasAttribute('assembly_version'));

  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row
  thead.innerHTML = `
      <tr>
          <th scope="col"></th>
          ${hasItemColumn ? '<th scope="col">Item</th>' : ''}
          <th scope="col">Part number</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Unit of Quantity</th>
          <th scope="col">S</th>
          <th scope="col">W</th>
          <th scope="col">P</th>
          ${hasAVColumn ? '<th scope="col">Assembly version</th>' : ''}
      </tr>
  `;

  // Sort children by Item
  children.sort((a, b) => parseInt(a.getAttribute('item')) - parseInt(b.getAttribute('item')));

  children.forEach(child => {
      const item = item.item;
      const partNumber = child.getAttribute('part_number');
      const name = child.getAttribute('name');
      const quantity = child.getAttribute('quantity');
      const unitOfQuantity = child.getAttribute('unit_of_quantity');
      const s = child.getAttribute('s') === '1' ? '✓' : '';
      const w = child.getAttribute('w') === '1' ? '✓' : '';
      const p = child.getAttribute('p') === '1' ? '✓' : '';
      const assemblyVersion = child.getAttribute('assembly_version');
      const hasHiddenChildren = child.querySelector('ul') !== null;
      const hasImage = child.hasAttribute('image');

      // Create row for each child
      const tr = document.createElement('tr');

      tr.innerHTML = `
          <td class="p-1 text-nowrap">
              <span title="${hasHiddenChildren ? 'Assembly' : 'Part'}">
                  ${hasHiddenChildren ? '⚙️' : '🔧'}
              </span>
              ${hasImage ? '<span><button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#imageModal"><span class="image-icon" title="Image"' + 'path="' + "static/img/" + child.getAttribute('image') + '">📘</button></span>' : ''}
          </td>
          ${hasItemColumn ? `<td class="p-1 text-nowrap">${item.item || ''}</td>` : ''}
          <td class="p-1 text-nowrap">${item.part_number}</td>
          <td class="p-1 text-nowrap">${item.name}</td>
          <td class="p-1 text-nowrap">${item.quantity}</td>
          <td class="p-1 text-nowrap">${item.unitOfQuantity}</td>
          <td class="p-1 text-nowrap">${item.s}</td>
          <td class="p-1 text-nowrap">${w}</td>
          <td class="p-1 text-nowrap">${p}</td>
          ${hasAVColumn ? `<td class="p-1 text-nowrap">${assemblyVersion || ''}</td>` : ''}
      `;
      tr.addEventListener('click', function (event) {
              //alert(tr.innerText);

              liElement = document.querySelectorAll('li [part_number="' + partNumber + '"]')[0];
              liElement.click();
              //liElement = liElement.closest('.hitarea, li');
              //liElement = liElement.classList.contains('hitarea') ? liElement.closest('li') : liElement;
              console.log(liElement);
              tableContainer.innerHTML = '';
              tableContainer.appendChild(displayTable(liElement));

      });
      tbody.appendChild(tr);
  });                

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

document.addEventListener('DOMContentLoaded', function () {
  const treeviewContainer = document.getElementById('treeview-container');
  const tableContainer = document.getElementById('table-container');

  treeviewContainer.addEventListener('click', function (event) {
      const target = event.target.closest('.hitarea, li');
      if (!target) return;

      const liElement = target.classList.contains('hitarea') ? target.closest('li') : target;
      if (!liElement) return;
      console.log(liElement)


      // Clear previous table and append new one
      tableContainer.innerHTML = '';
      tableContainer.appendChild(displayTable(liElement));
  });

});

document.getElementById('table-container').addEventListener('click', function (event) {
  const target = event.target.closest('.image-icon');
  if (!target) return;

  // Set the src attribute of the modal image
  const imagePath = target.getAttribute('path');
  modalImage.src = `${imagePath}`;
});

$(document).ready(function($) {
  $(".clickable-row").click(function() {
      //alert('hello')
  });
});