function displayTable(node) {
    const tableContainer = document.getElementById('table-container');
    const children = Array.from(node.children);
    if (children.length === 0) return;

    const hasItemColumn = children.some(child => child.hasOwnProperty('item'));
    const hasAVColumn = children.some(child => child.hasOwnProperty('assembly_version'));

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
    children.sort((a, b) => parseInt(a.item) - parseInt(b.item));

    children.forEach(child => {
        const item = child.item;
        const partNumber = child.part_number;
        const name = child.name;
        const quantity = child.quantity;
        const unitOfQuantity = child.unit_of_quantity;
        const s = child.s === '1' ? '✓' : '';
        const w = child.w === '1' ? '✓' : '';
        const p = child.p === '1' ? '✓' : '';
        const assemblyVersion = child.assembly_version;
        const hasHiddenChildren = child.querySelector('ul') !== null;
        const hasImage = child.hasOwnProperty('image');

        // Create row for each child
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="p-1 text-nowrap">
                <span title="${hasHiddenChildren ? 'Assembly' : 'Part'}">
                    ${hasHiddenChildren ? '⚙️' : '🔧'}
                </span>
                ${hasImage ? '<span><button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#imageModal"><span class="image-icon" title="Image"' + 'path="' + "static/img/" + child.image + '">📘</button></span>' : ''}
            </td>
            ${hasItemColumn ? `<td class="p-1 text-nowrap">${item || ''}</td>` : ''}
            <td class="p-1 text-nowrap">${partNumber}</td>
            <td class="p-1 text-nowrap">${name}</td>
            <td class="p-1 text-nowrap">${quantity}</td>
            <td class="p-1 text-nowrap">${unitOfQuantity}</td>
            <td class="p-1 text-nowrap">${s}</td>
            <td class="p-1 text-nowrap">${w}</td>
            <td class="p-1 text-nowrap">${p}</td>
            ${hasAVColumn ? `<td class="p-1 text-nowrap">${assemblyVersion || ''}</td>` : ''}
        `;

        tbody.appendChild(tr);
    });                

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

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