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
        const hasHiddenChildren = null//child.querySelector('ul') !== null;
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
        tr.addEventListener('click', function (event) {
            tableClickHandler(partNumber)
        });
        tbody.appendChild(tr);
    });                

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}
async function loadTree(data) {
    var tree = await $('#tree1').tree({
        data: data
    });
    console.log('loading')
    tree.treeview({
      collapsed: true,
      animated: 'medium',
      unique: false
    });
    console.log('styling')
    return 'done';

}
var currentNode;
var data = [{
    "item":"10", "part_number":"1971659", "name":"Grease SYNTHESO PROBA 270", "quantity":"1", "unit_of_quantity":"PC", "s":"1", "w":"0", "p":"0", "assembly_version":"171135158" image":"FOL1010501800000.JPG"
    "children": [
        { "item": "10", "part_number":"10085110", "name":"Drive motor", "quantity":"1", "unit_of_quantity":"PC", "s":"0", "w":"0", "p":"0", "assembly_version":"171135158" },
        { "name": "child2", "children": 
            {  "item" : "20", "part_number":"10085111", "name":"Drive motor"}    
        }
    ]
},
{
    "name": "node2",
    "children": [
        { "name": "child3" }
    ]
}];
//const json = JSON.parse(data);
//fetch('data.json' )
fetch('https://snippet.host/cxaamj/raw') 
.then((response) => response.json())
.then(function(json) {loadTree(json)}).then(treeClickHandler());
//console.log(data);
//loadTree(json) ;

function treeClickHandler() {
  $('#tree1').on(
    'tree.click',
    function(event) {
        // The clicked node is 'event.node'
        var node = event.node;
        alert(node.name);
        const table = displayTable(node);
        currentNode = node;
        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
        
    }
  );
}
function tableClickHandler(partNumber) {
  //console.log(event.target)
  node = currentNode.children.find((child) => { child.part_number == partNumber});
}

