
function game_redesign_card_groups_html(cardGroups, baseHeight, containerW, containerH, passo) {
    let textGroup = '';
    let countCards = 0;
    let value = '';
    let text = '';
    let naipe = '';
    let pastaImg = '';
    let arquivoImg = '';
    let styleImg = '';
    let totalWidth = 0;
    let propHeight = 0;
    let widthSpan = 0;
    let lineWidth = 0;
    const baseWidth = Math.floor(baseHeight/4*2.7);
    console.log('try passo '+passo+': baseHeight: '+(baseHeight));
    let cardGroup = new Object();
    for (let i=0; i < cardGroups.length; i++) {
        cardGroup = cardGroups[i];
        value = cardGroup.value;
        textGroup = "<span class=img_nowrap id=span_"+i+">";
        widthSpan = 0;
        for (let j=0; j < cardGroup.listNaipes.length; j++) {
            naipe = cardGroup.listNaipes[j];
            pastaImg = 'modelo01';
            if (j == (cardGroup.listNaipes.length-1)) {
                pastaImg = 'modelo02';
            }
            arquivoImg = pastaImg+'/'+value+'-'+naipe+'.gif';
            textGroup += '<img src="../../imgs/cards/'+arquivoImg+'"';
            textGroup += ' id=player1_card_'+countCards;
            styleImg = ' style="height:'+baseHeight+'px;';
            if (j > 0) {
                styleImg += 'margin-left:-'+Math.floor(baseWidth/3*2)+'px;';
                widthSpan += baseWidth/3;
            } else {
                widthSpan += baseWidth;
            }
            if (j == (cardGroup.listNaipes.length - 1)) {
                styleImg += 'margin-right:5px;';
                widthSpan += 5;
            }
            styleImg += '"';
            textGroup += styleImg + '>';
            countCards += 1;
        }
        textGroup += "</span>";
        lineWidth += widthSpan;
        
        if (lineWidth > containerW) {
            textGroup = "<br>"+textGroup;
            totalWidth += containerW;
            lineWidth = widthSpan;
        }
        text += textGroup;
    }
    totalWidth += lineWidth;
    console.log(text);
    console.log('totalWidth: '+totalWidth + ', containerW: '+containerW);
    propHeight = Math.floor(containerH/baseHeight);
    if (propHeight == 0) { propHeight = 1; }
    console.log('propHeight: '+propHeight);
    if (totalWidth/propHeight > containerW) {
        baseHeight = Math.floor(baseHeight*0.95);
        text = game_redesign_card_groups_html(cardGroups, baseHeight, containerW, containerH, passo+1);
    }
    //text = '<p style="border:2px solid red;height='+baseHeight+'px;" id=p_p1_cards>'+text+'</p>';
    return text;
}
