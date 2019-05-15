"file": {
  "el": null,
    "uploadFile": function(uploadBtnObj, fileObj, callback) {
      var ubAttrs = this.getUploadBtnAttrs(uploadBtnObj);
      var callback = callback || null;
      var zjMsgObj = null;
      var zjRetryObj = null;
      if (ubAttrs["uploadStatus"] == "send") {
        return;
      }
      var _data = this.getFormBaseData(fileObj);
      if (_data == null) {
        return;
      }
      var oldUploadBtnHtml = $(uploadBtnObj).html();
      $(uploadBtnObj).attr("data-upload-status", "send");
      if (ubAttrs["uploadMode"] == "zj") {
        $(uploadBtnObj).css("z-index", "7");
        zjMsgObj = $(uploadBtnObj).parent().find(".message-box");
        zjRetryObj = $(uploadBtnObj).parent().find(".retry-btn");
        zjRetryObj.css("z-index", "6");
        zjMsgObj.html("上传中...");
      } else {
        $(uploadBtnObj).html("上传中...");
      }
      processCrossAjax({
        url: _SG["apiPreUrl"] + "/file/upload",
        type: 'POST',
        cache: false,
        data: _data,
        processData: false,
        contentType: false,
        success: function (rs) {
          if (ubAttrs["uploadMode"] != "zj") {
            $(uploadBtnObj).html(oldUploadBtnHtml);
          }
          $(uploadBtnObj).attr("data-upload-status", "done");
          var flag = false;
          if (_SG.isReplyOk(rs)) {
            var rsData = rs.data || null;
            if (!!rsData) {
              flag = true;
              var fname = rsData;
              if (ubAttrs["uploadMode"] == "normal" && ubAttrs["fillJid"] != "") {
                $(ubAttrs["fillJid"]).val(fname);
              }
              if (callback != null) {
                callback(fname, rsData);
              }
            }
          }
          if (!flag) {
            if (ubAttrs["uploadMode"] == "zj") {
              zjRetryObj.css("z-index", "9");
              zjMsgObj.html("上传失败, 请重新上传！");
            } else {
              layer.alert("上传失败！");
            }
          }
        },
        error: function () {
          if (ubAttrs["uploadMode"] == "zj") {
            zjRetryObj.css("z-index", "9");
            zjMsgObj.html("发生异常，请稍后上传！");
            $(uploadBtnObj).attr("data-upload-status", "done");
          } else {
            $(uploadBtnObj).html(oldUploadBtnHtml);
            $(uploadBtnObj).attr("data-upload-status", "done");
            layer.alert("上传时发生网络异常，请稍后重试！");
          }
        }
      });
    },
  "getFormBaseData": function(o) {
    var fObj = $(o);
    var fileData = fObj[0].files[0];
    if (!fileData) {
      return null;
    }
    var _data = new FormData();
    _data.append('file', fileData);
    return _data;
  },
  "getUploadBtnAttrs": function(o) {
    var uploadType = $(o).attr("data-upload-type") || "";
    var uploadMode = $(o).attr("data-upload-mode") || "normal";
    var uploadStatus = $(o).attr("data-upload-status") || "";
    var fillJid = $(o).attr("data-fill-jid") || "";
    var attrs = {
      "uploadType": uploadType,
      "uploadMode": uploadMode,
      "uploadStatus": uploadStatus,
      "fillJid": fillJid
    };
    return attrs;
  },
  "showFileChoose": function(o, callback) {
    var uploadBtnObj = $(o);
    var ubAttrs = this.getUploadBtnAttrs(uploadBtnObj);
    if (ubAttrs["uploadStatus"] == "send") {
      return;
    }
    if (this.el != null) {
      document.body.removeChild(this.el);
    }
    var obj = document.createElement("input");
    obj.type = "file";
    obj.style.display = "none";
    obj.onchange = function () {
      if (ubAttrs["uploadMode"] == "normal" || ubAttrs["uploadMode"] == "zj") {
        _SG["file"].uploadFile(uploadBtnObj, this, callback);
      }
    }
    document.body.appendChild(obj);
    this.el = obj;
    this.el.click();
  },
},