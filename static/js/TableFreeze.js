/*********************************
** ����:JQeuryʵ�ֱ�����ж���
**
** ����:YJJ
**
** ʱ��:2014��4��16��
**
** �޸��ˣ�Allen
**
** �޸�ʱ��:2017-06-10
**
** �޸ļ�¼:����
**
** ����:����Excel�еĶ��ᴰ����.���������ͷ�̶����,���е�Ԫ��ĸ߶�,ָ�������;
**
** �޸��ˣ�Christopher
**
** �޸�ʱ��:2018-08-05
**
** �޸ļ�¼:���Ӷ����Ҳ��еĹ���+����
**
** ����:֧�ֶ��ắ�������4�����������ڶ���β��;����ie�¿�Ⱥ͸߶���ʾ������
**********************************/
$.fn.mergeAttributes = function(src){
	if($.browser.msie) {
		$(this).get(0).mergeAttributes(src.get(0));
	}else{
		attrs = src.get(0).attributes;
		i = attrs.length - 1;
		for(;i>=0;i--){
			var name = attrs[i].name;
			if(name.toLowerCase() === 'id' || attrs[i].value=="" || attrs[i].value==null ||attrs[i].value=="null"){
				continue;
			}
			try{
				$(this).attr(name,attrs[i].value);
			}catch(e){
			}
		}
	}
}
$.fn.FrozenTable = function(iRowHead,iRowFoot,iColLeft,iColRight){
	var oTable = $(this);
	var oTableId = oTable.attr("id");
	var oDiv = $(this).parent();
	// ���ݲ�ͬ������¸߶�
	var addHeight = null;
	if(oDiv.get(0).tagName != "DIV") return;
	oTable.find("td").attr("noWrap","nowrap");
	if($.browser.msie) {
		addHeight = 1;
	}else{
		addHeight = null;
	}
    if (oTable.width() > oDiv.width() && oTable.height() > oDiv.height()) {
    	// top��������left�����н���
		if(iRowHead>0 && iColLeft>0){
			var oCloneTable = $("<table id='oTableLH_"+oTableId+"'></table>");//������������к��н����ı�ͷ
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,0,iRowHead,iColLeft,null,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1005");
			oCloneTable.css("left",oDiv.offset().left);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top);
		}
		// // bottom��������left�����н���
		if(iRowFoot>0 && iColLeft>0){
			var oCloneTable = $("<table id='oTableLF_"+oTableId+"'></table>");	
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,iColLeft,null,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1004");
			oCloneTable.css("left",oDiv.offset().left);
			oCloneTable.css("top",(oDiv.offset().top+oDiv.outerHeight(true)-oCloneTable.outerHeight(true)-17));
		}
		// top��������right�����н���
		if(iRowHead>0 && iColRight>0){
			var oCloneTable = $("<table id='oTableRH_"+oTableId+"'></table>");
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,0,iRowHead,-1,iColRight,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1006");
			oCloneTable.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneTable.outerWidth(true)-17);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top);
		}

		// bottom��������right�����н���
		if(iRowFoot>0 && iColRight>0){
			var oCloneTable = $("<table id='oTableRF_"+oTableId+"'></table>");
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,-1,iColRight,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1007");
			oCloneTable.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneTable.outerWidth(true)-17);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top+oDiv.outerHeight(true)-oCloneTable.outerHeight(true)-17);
		}

	}
	//top������
    if (iRowHead > 0 && oTable.height() > oDiv.height()) {
		var oCloneDiv = $("<div id='oDivH_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,iRowHead,-1);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("width",oDiv.outerWidth(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1002");
		oCloneDiv.css("left",oDiv.offset().left);
		oCloneDiv.css("top",oDiv.offset().top);
	}
	// bottom������
    if (iRowFoot > 0 && oTable.height() > oDiv.height()) {
		var oCloneDiv = $("<div id='oDivF_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,-1);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("width",oDiv.outerWidth(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1001");
		oCloneDiv.css("left",oDiv.offset().left);
		oCloneDiv.css("top",oDiv.offset().top+oDiv.outerHeight(true)-oCloneDiv.outerHeight(true)-17);
	}
	// left������
    if (iColLeft > 0 && oTable.width() > oDiv.width()) {
		var oCloneDiv = $("<div id='oDivL_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,oTable.find("tr").length,iColLeft);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("height",oDiv.outerHeight(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1000");
        // oCloneDiv.css("left", oDiv.offset().left);//ע�͵��ɽ����������
		oCloneDiv.css("top",oDiv.offset().top);
	}
	// right������
	if (iColRight > 0 && oTable.width() > oDiv.width()) {
		var oCloneDiv = $("<div id='oDivR_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,oTable.find("tr").length,-1,iColRight);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("height",oDiv.outerHeight(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1003");
        oCloneDiv.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneDiv.outerWidth(true)-17);
		oCloneDiv.css("top",oDiv.offset().top);
	}
	oDiv.scroll(function(){
		if(typeof($("#oDivH_"+oTableId).get(0))!='undefined'){
			$("#oDivH_"+oTableId).scrollLeft($(this).scrollLeft());
		}
		if(typeof($("#oDivF_"+oTableId).get(0))!='undefined'){
			$("#oDivF_"+oTableId).scrollLeft($(this).scrollLeft());
		}
		if(typeof($("#oDivL_"+oTableId).get(0))!='undefined'){
			$("#oDivL_"+oTableId).scrollTop($(this).scrollTop());
		}
		if(typeof($("#oDivR_"+oTableId).get(0))!='undefined'){
			$("#oDivR_"+oTableId).scrollTop($(this).scrollTop());
		}
	});
};
$.fn.CloneTable = function(oSrcTable,iRowStart,iRowEnd,iColumnEnd,colRightNum,addHeight){
	var iWidth = 0,iHeight = 0;
	$(this).mergeAttributes(oSrcTable);
	var Log="";
	var rowspanValue = 0;
	var rowNumber = 0;
	var rowIndex;
	for(var i=iRowStart;i<iRowEnd;i++){
		// ��ǰѡ����
		var oldTr = oSrcTable.find("tr").eq(i);
		// �Ƿ�ֻ�����кϲ��ĵ�Ԫ����Ҫ����
		var isSingleRowspan = false;
		// �кϲ��ĵ�Ԫ������
		var rowspanCount = 0;
		var colCount = 0;
		// ��Ҫ���Ƶ�����
		var colNumber = 0;
		for(var j=(colRightNum?(oldTr.find("td").length-colRightNum):0); j<(iColumnEnd==-1?oldTr.find("td").length:iColumnEnd); j++){
			var oidTd = oldTr.find("td").eq(j);
			colNumber++;
			var colspan = oidTd.attr("colspan");
			if (typeof(colspan)=="undefined" || colspan==1) { 
			   colCount += 1;
			}else{
			   colCount += colspan;
			}  
			var rowspan = oidTd.attr("rowspan");
			if(typeof(rowspan)!="undefined" && rowspan!=1){
				// �кϲ��ĵ�Ԫ������
				rowspanCount++;
				// �ϲ��еĵ�Ԫ��λ�ã��ڼ��У�
				rowIndex = i;
				// �ϲ���������
				rowspanValue = rowspan;
				// �кϲ��ĵ�Ԫ������
				rowNumber = rowspanCount;
			}
			if(colCount>=iColumnEnd && iColumnEnd!=-1){
				break;
			}
		} 
		Log +=i+"=="+rowIndex+"="+rowspanCount+"="+rowNumber+"="+rowspanValue+"<br>";
		// ��ȡ��Ҫ���Ƶ�����
		// �Ժϲ��еĵ�Ԫ�񸲸��µ������жϺ�����
		if(i>rowIndex && i<=(rowIndex+rowspanValue-1) && (iColumnEnd!=-1 || colRightNum) ){
			// �ж��Ƿ�����ںϲ����е�Ԫ����Ҫ����
			if(rowNumber!=0 && (iColumnEnd==rowNumber || colRightNum==rowNumber) ){
				isSingleRowspan = true;
			}else{
				// ��ȥ�кϲ��ĵ�Ԫ������
				colNumber -= 1;
				if(rowspanCount==0){
					colNumber -= (rowNumber-1);
				}
			}
		}
		if(colNumber!=0){
			var newTr = $("<tr></tr>");
			newTr.mergeAttributes(oldTr);
			var jWidth = 0;
			iHeight += oldTr.outerHeight(true);
			for(var j=(colRightNum?(oldTr.find("td").length-colRightNum):0); j<colNumber+(colRightNum?(oldTr.find("td").length-colRightNum):0);j++){
				if(isSingleRowspan){
					continue;
				}
				var oidTd = oldTr.find("td").eq(j);
				var newTd = oidTd.clone();
				
				/*IE һ�ж��кϲ�ʱ
				if(iColumnEnd==-1 && iRowStart!=0 && $.browser.msie){
					if (typeof(newTd.attr("colspan"))!="undefined" && newTd.attr("colspan")!=1) { 
						alert(newTd.text()+"==2=="+newTd.attr("colspan")+"---"+colCount);
					}  
				}
				if(iColumnEnd==-1 && iRowStart!=0 && j==1){
				    newTd.width(oidTd.outerWidth(true)-1);
					jWidth += (oidTd.outerWidth(true)-1);
				}else{
					newTd.width(oidTd.outerWidth(true));
					jWidth += oidTd.outerWidth(true);
				}*/

				newTd.height(oidTd.outerHeight(true)-3);
				// ���ݲ�ͬ������¿��
				if($.browser.msie) {
					newTd.width(oidTd.width());
				}else{
					newTd.width(oidTd.outerWidth(true));
				}
				jWidth += oidTd.outerWidth(true);
				iWidth = Math.max(iWidth,jWidth);
				newTr.append(newTd);
			}
			$(this).append(newTr);
		}
	}
	$(this).width(iWidth);
	if(addHeight){
		$(this).height(iHeight+addHeight);
	}else{
		$(this).height(iHeight);
	}
}