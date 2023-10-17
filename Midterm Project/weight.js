document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Handle data to display images and texts
        const conversionTypeSelect = document.getElementById('conversion-type');
        const formulaImage = document.getElementById('formula-image').querySelector('img');
        const convertedValueSpan = document.getElementById('converted-value');
  
        // Handle form submission and conversion logic
        document.getElementById('weight-form').addEventListener('submit', function (e) {
          e.preventDefault();
  
          // Get user input
          const inputValue = parseFloat(document.getElementById('input-value').value);
          const selectedConversionType = conversionTypeSelect.value;
  
          // Perform the conversion based on the selected type
          let result;
          if (selectedConversionType === 'milligramToGram') {
            result = inputValue * 0.001;
          }else if(selectedConversionType === 'gramToKilogram'){
            result = inputValue * 0.001;
          }else if(selectedConversionType === 'kilogramToMilligram'){
            result = inputValue *1000000;
          }
          else if(selectedConversionType === 'poundToOunce'){
            result = inputValue *16;
          }else if(selectedConversionType === 'ouncesToPound'){
            result = inputValue /16;
          }
          else if(selectedConversionType === 'kilogramToPound'){
            result = inputValue *2.205;
          }else if(selectedConversionType === 'poundToKilogram'){
            result = inputValue /2.205;
          }
  
          // Display the result
          convertedValueSpan.textContent = result;
  
          // Display the corresponding image and text based on the selected type
          const selectedConversionData = data.find(item => item.id === selectedConversionType);
          formulaImage.src = selectedConversionData.imagePath; // Set the image source
          formulaImage.alt = "Conversion Formula";
  
          // Display the corresponding text
          document.getElementById('formula-text').textContent = selectedConversionData.text;
          document.getElementById('formula-text2').textContent = selectedConversionData.formula;
        });
      });
  });