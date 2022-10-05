import { DOMcreateElement ,escapeHtml } from "@/TiptapEditor/utils/useTemplate";

/**
 * 
 * @param {Object} tablejson 
 * @returns {Object[]}
 */
export function transTableFormat(tablejson) {
    let tab = []
    for (let row in tablejson["content"]) {
        let tabrow = []
        for (let cell in tablejson["content"][row]["content"]) {
            let tabcell = []
            let content = ""
            if(tablejson["content"][row]["content"][cell]["content"].length == 1){
                if(tablejson["content"][row]["content"][cell]["content"][0]["content"]){
                    content = tablejson["content"][row]["content"][cell]["content"][0]["content"][0]["text"]
                }else{
                    content=""
                }
            }else{
                tablejson["content"][row]["content"][cell]["content"].forEach((each) =>{
                    content += escapeHtml(DOMcreateElement(each))
                })
            }
            if (tablejson["content"][row]["content"][cell]["content"][0]["content"]) {
                tabcell.push({
                    "content": content,
                    "colspan": tablejson["content"][row]["content"][cell]["attrs"]["colspan"],
                    "rowspan": tablejson["content"][row]["content"][cell]["attrs"]["rowspan"],
                })
            }
            tabrow.push(tabcell)
        }
        tab.push(tabrow)
    }

    console.log(JSON.stringify(tab))
    return tab;
}

