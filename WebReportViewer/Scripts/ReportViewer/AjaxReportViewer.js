// require jQuery 1.5.1

function WcfClient(url) {
    this._url = url;
    this.invoke = function(methodName, data, complete) {
        var completeInternal = function(data, status) {
            var response = JSON.parse(data.responseText);
            complete(response, response.d, status);
        };
        var settings = {
            data: JSON.stringify(data),
            complete: completeInternal,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "POST"
        };
        $.ajax(this._url + "/" + methodName, settings);
    };
}

// DataContract
function ReportNameIdentity(value) {
    this.__type = "ReportNameIdentity:http://schemas.datacontract.org/2004/07/DevExpress.Xpf.Printing.ServiceModel.DataContracts";
    this.Value = value;
}

var TaskStatus = {
    Fault: 0,
    InProgress: 1,
    Complete: 2
};

var PageCompatibility = {
    HTML: 3
};

function ReportViewerClient(url) {
    this._client = new WcfClient(url);
    
    this.getReportInformation = function(reportName, complete) {
        var args = { identity: new ReportNameIdentity(reportName) };
        this._client.invoke("GetReportInformation", args, complete);
    };
    
    this.startBuild = function(reportName, parameters, complete) {
        var args = {
            identity: new ReportNameIdentity(reportName),
            buildArgs: { Parameters: parameters }
        };
        this._client.invoke("StartBuild", args, complete);
    };
    
    this.getBuildStatus = function(documentId, complete) {
        this._client.invoke("GetBuildStatus", { documentId: documentId }, complete);
    };
    
    this.getPage = function(documentId, pageIndex, compatibility, complete) {
        var args = {
            documentId: documentId,
            pageIndex: pageIndex,
            compatibility: compatibility
        };
        this._client.invoke("GetPage", args, complete);
    };
}

function CreateReportOperation(reportViewerClient, reportName) {
    this._client = reportViewerClient;
    this.start = function() {
    };
}