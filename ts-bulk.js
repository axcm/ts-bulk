void(function(window, document) {
  const droppable = document.querySelector('#bulkInputDialog .dijitDialogPaneContent');

  if(!window.FileReader) {
    alert("File API がサポートされていません。");
    return false;
  }

  if(!droppable) {
    alert("一括入力を開いてください");
    return false;
  }

  const cancelEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  droppable.addEventListener("dragenter", cancelEvent);
  droppable.addEventListener("dragover", cancelEvent);

  const parseCSV = (csvText) => {
    let lines = csvText.split("\n");
    return lines.map(line => {
      let entry = line.split(",");
      return {
        date: entry[0],
        begin: entry[1],
        end: entry[2]
      }
    });
  }

  const inputTime = (date, beginTime, endTime) => {
    let beginForm = document.querySelector('#bulkInputS' + date);
    let endForm = document.querySelector('#bulkInputE' + date);

    beginForm.value = beginTime;
    endForm.value = endTime;
  }

  const handleDroppedFile = (event) => {
    try {
      const file = event.dataTransfer.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        let records = parseCSV(fileReader.result);

        records.forEach((record) => {
          inputTime(record.date, record.begin, record.end);
        })
      }

      fileReader.readAsText(file);

      cancelEvent(event);
    }
    catch (e) {
      console.error(e);
      cancelEvent(event);
    }

    return false;
  }

  droppable.addEventListener("drop", handleDroppedFile);

}(window, document));
