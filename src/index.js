import "./styles.css";

const onClickAdd = () => {
    // テキストボックスの値を取得し、初期化する
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";
    createIncompleteList(inputText);
};
// 未完了リストから指定の要素を削除
const removeFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
    // div生成
    const div = document.createElement("div");
    div.className = "list-row";

    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;
    // liタグ生成
    const li = document.createElement("li");

    // button(done!)タグ生成
    const doneButton = document.createElement("button");
    doneButton.innerText = "done!";
    doneButton.addEventListener("click", () => {
        // 押されたdoneボタンの親(div)の親タグ（li）を未完了リストから削除
        removeFromIncompleteList(doneButton.parentNode.parentNode);
        // 完了リスト（ id="complete-list"）に追加する要素
        const addTarget = doneButton.parentNode.parentNode;
        // TODO内容テキストを取得
        const text = addTarget.firstElementChild.firstElementChild.innerText;
        // div以下を初期化
        addTarget.textContent = null;
        // div生成
        const div = document.createElement("div");
        div.className = "list-row";
        // pタグ生成
        const p = document.createElement("p");
        p.innerText = text;

        // buttonタグ生成
        const undoButton = document.createElement("button");
        undoButton.innerText = "undo";
        undoButton.addEventListener("click", () => {
            // 押されたundoボタンの親タグを完了リストから削除
            const undoTarget = undoButton.parentNode.parentNode;
            document.getElementById("complete-list").removeChild(undoTarget);

            // テキスト取得
            const text = undoButton.parentNode.firstElementChild.innerText;
            // div以下を初期化
            undoTarget.textContent = null;
            // pタグ生成
            const p = document.createElement("p");
            p.innerText = text;
            createIncompleteList(text);
        });

        // divタグの子要素に各要素を設定
        div.appendChild(p);
        div.appendChild(undoButton);
        addTarget.appendChild(div);

        // 完了のリストに追加
        document.getElementById("complete-list").appendChild(addTarget);
    });

    // button(remove)タグ生成
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.addEventListener("click", () => {
        // 押されたremoveボタンの親(div)の親タグ（li）を未完了リストから削除
        removeFromIncompleteList(removeButton.parentNode.parentNode);
    });
    // divタグの子要素に各要素を設定
    div.appendChild(p);
    div.appendChild(doneButton);
    div.appendChild(removeButton);
    li.appendChild(div);
    // 未完了のリストに追加
    document.getElementById("incomplete-list").appendChild(li);
};

document
    .getElementById("add-button")
    .addEventListener("click", () => onClickAdd());
