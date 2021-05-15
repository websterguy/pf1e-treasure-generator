export class generatorDialog extends Application {

    constructor(options){
        super(options)
    }

    static get defaultOptions() {
        const options = super.defaultOptions
        options.id = "treasureGenerator"
        options.template = "modules/pf1e-treasure-generator/templates/encounter.html"
        options.width = 400
        //options.height = 700
        //options.resizable = true
        options.classes = ["encounter"]
        options.popOut = true
        options.title = "Treasure Generator"

        return options
    }

    static generatorDialogInstance = {}

    static async renderDialog() {

        generatorDialog.generatorDialogInstance = new generatorDialog

        generatorDialog.generatorDialogInstance.render(true)

    }

    activateListeners(html) {

        super.activateListeners(html);

        let generatorCustomButton = $("#customizeButton")
        generatorCustomButton.on("click", async function() {
            console.log("customize click");
        })

        let generatorRollButton = $("#rollButton")
        generatorRollButton.on("click", async function() {
            console.log("roll click");
        })
    }
}
