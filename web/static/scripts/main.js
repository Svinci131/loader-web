$(document).ready(() => {
  const rootUrl = window.location.href.split(':170')[0]
  // const rootUrl = 'http://10.1.130.21'
  const fields = {
    motion: ['axis', 'sync', 'theta', 'zeros'],
    cartesian: ['x', 'z', 'sync', 'wait', 'delay']
  }

  let formType = 'motion'
  let motions = []
  let waypoints = []
  let fileName = formType

  const saveFile = (e) => {
    e.preventDefault()
    const content = formType === 'motion' ? motions : waypoints

    if (!content.length) {
      alert('no data added')
    } else {
      const url = `${rootUrl}:8080/save/${fileName}.json`
      const data = formType === 'motion' ? '"motion": ' + JSON.stringify(motions) : '"cartesian": ' + JSON.stringify(waypoints)

      $.post(url, data, (data, status) => {
        alert(status)
      })
    }
  }

  const sendFile = () => {
    const content = formType === 'motion' ? motions : waypoints
    const url = `${rootUrl}:8080/send/${formType}.json`
    console.log('here', fileName)

    $.ajax({
      type: 'GET',
      url: url,
      crossDomain: true,
      success: function(responseData, textStatus, jqXHR) {
        alert(responseData);
        _clearData()
      },
      error: function (responseData, textStatus, errorThrown) {
        alert('POST failed.');
      }
    })
  }

  const sendCmd = (e) => {
    const cmd = $(e.target)[0].id
    const url = `${rootUrl}:8080/${cmd}/`

    $.ajax({
      type: 'GET',
      url: url,
      crossDomain: true,
      success: function(responseData, textStatus, jqXHR) {
        alert(responseData);
      },
      error: function (responseData, textStatus, errorThrown) {
          alert('POST failed.');
      }
    })
  }

  const renderPreview = (formType) => {
    $('#preview-content').empty()

    const dataElements = formType === 'motion' ? motions : waypoints
    dataElements.forEach((item) => {
      const content = Object.keys(item).reduce((str, key) => {
        return `${str} <strong>${key}: </strong>${item[key]}`
      }, '')

      $('#preview-content').append(`<div><p>${content}<p></div>`)
    })
  }

  const drawFormFields = (formName) => {
    fields[formName].reverse().forEach(field => {
      const content = `<div class="form-group">
          <label for="${field}">${field}</label>
          <input type="${field}" class="form-control" id="${field}" placeholder="${field}">
        </div>`

      $('#file-form').prepend(content)
    })
  }

  const drawForm = (formName) => {
    $('#file-name-input-wrapper>label').html(`File Name: <em>${fileName}.json</em>`)
    $('#file-name-input').val(fileName)
    
    $('#file-form').empty()
    $('#file-name-input').on('keyup', (e) => {
      e.preventDefault()
      if (e.keyCode == 13) {
        _changeFileName(e.target.value)
      }
    })

    drawFormFields(formName)
  }

  function _changeFileName(newName) {
    fileName = newName
    $('#file-name-input-wrapper>label').html(`File Name: <em>${fileName}.json</em>`)
  }

  const addData = (formName) => {
    const data = fields[formType].reduce((dataObj, field) => {
      dataObj[field] = parseInt($(`#${field}`).val(), 10)
      return dataObj
    }, {})
    
    if (formName == 'motion') motions.push(data)
    else waypoints.push(data)
  }

  function _clearData() {
    motions = []
    waypoints = []
    renderPreview()
  }

  $('#form-add-data-btn').on('click', (e) => {
    e.preventDefault()
    addData(formType)
    renderPreview(formType)
    $('#file-form')[0].reset()
  })

  function _usingDefaultFileName() {
    return (fileName === 'motion' || fileName === 'cartesian')
  }

  $('#select-form').on('change', (e) => {
    formType = e.target.value
    if (_usingDefaultFileName()) _changeFileName(formType)
    
    _clearData()
    drawForm(formType)
    const btnText = formType === 'cartesian' ? 'Add Waypoints' : 
    'Add Motions'
    $('#form-add-data-btn').text(btnText)
  })

  $('#save-file-btn').on('click', saveFile)
  $('#send-file-btn').on('click', sendFile)
  $('.cmd-btn').on('click', sendCmd)

  drawForm(formType)
})