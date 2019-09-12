class ResultManager {
    constructor() {
        this._result = null;
    }
    set result(result) {
        this._result = result;
    }
    get result() {
        return this._result;
    }
    showResult() {
        this._result.showResult();
    }
}