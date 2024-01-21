const sheetName = "Productos";
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsSheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsSheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty("key"));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        headers: headers,
        rows: getRowsData(sheet, headers),
      })
    ).setMimeType(ContentService.MimeType.JSON);

    const idIndex = headers.indexOf("id");
    const recaudadoIndex = headers.indexOf("recaudado");
    const donantesIndex = headers.indexOf("donantes");

    // Obtén la información del producto desde los parámetros del evento (e)
    const productId = e.parameter.id;
    const amountRaised = parseFloat(e.parameter.amountRaised);
    const donorName = e.parameter.donorName;

    // Encuentra la fila correspondiente al producto
    const productRow = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, headers.length)
      .getValues()
      .findIndex((row) => row[idIndex] == productId);

    // Actualiza los valores de "recaudado" y "donantes" en la fila correspondiente
    if (productRow !== -1) {
      sheet.getRange(productRow + 2, recaudadoIndex + 1).setValue(amountRaised);
      sheet.getRange(productRow + 2, donantesIndex + 1).setValue(donors);
      sheet.getRange(productRow + 2, donantesIndex + 1).setValue(donorName);
      return ContentService.createTextOutput(
        JSON.stringify({ result: "success" })
      );
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ result: "error", error: "Producto no encontrado" })
      );
    }
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    );
  } finally {
    lock.releaseLock();
  }
}
