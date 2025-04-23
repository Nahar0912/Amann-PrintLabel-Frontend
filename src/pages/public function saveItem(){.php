public function saveItem(){
        
        $this->validate([
            'barcode'=>'required|string',
            'quantity'=>'required'
        ]);
        
        $article_ength = nicelabel::where('BAR_CODE', $this->barcode)->first();
        
        if($article_ength == null){
            
            $pieces = explode("-", $this->barcode);
            $pieces_length = count($pieces);
            
            $article_ength = Article_Tex_Length::where('Article_No', $pieces[0])->first();
            
            $date = date_format(Carbon::now(),"Ym");

            $nicelabel = new nicelabel;
            /*
			0= Article
			1= Amann Color Code
			2= Competetor color code
			3= order number
            */
            $article = null;
            $colorCode = null;
            $orderNumber = null;
            $amannColor = null;
            $competetorColor = null;
                
            if($pieces_length == 3){
                $article = $pieces[0];
                $colorCode = $pieces[1];
                $amannColor = $pieces[1];
                $orderNumber = $pieces[2];
            }else{
                $article = $pieces[0];
                //$colorCode = $pieces[1].'-'.$pieces[2];
                $colorCode = $pieces[1];
                $amannColor = $pieces[1];
                $competetorColor = $pieces[2];
                $orderNumber = $pieces[3];
            }
                
            try{
                $nicelabel->COLOR_CODE	=	$colorCode;
                $nicelabel->AMANN_COLOR_CODE	=	$amannColor;
                $nicelabel->COMPETETOR_COLOR_CODE =	$competetorColor;
            }catch(\Exception $e){
                $nicelabel->COLOR_CODE	=	$colorCode;
                $nicelabel->AMANN_COLOR_CODE	=	$amannColor;
                $nicelabel->COMPETETOR_COLOR_CODE =	$competetorColor;
            }
            
            
            $nicelabel->BAR_CODE =	$this->barcode;
            $nicelabel->ORDER_QUANTITY	=	$this->quantity;
            $nicelabel->BATCH_LOT_NO	=	$orderNumber;
            
            $nicelabel->ARTICLE_NO	=	$article;
            $nicelabel->DATE	=date_format(Carbon::now(),"Y-m-d H:i:s");
            $nicelabel->CARTON_INSIDE_QUANTITY	=	$article_ength->No_of_Cones_inside_the_Carton;
            $nicelabel->TEX_NO	=	$article_ength->Tex_No;
            $nicelabel->LENGTH	=	$article_ength->Length;
            $nicelabel->CONE_ROUND_TEX	=	$article_ength->Cone_Round_Tex;
            $cache = $nicelabel->NO_OF_STICKER_WITH_FULL_BOX	=	intval(((int) $this->quantity) / ((int) $article_ength->No_of_Cones_inside_the_Carton));
            $cache = $nicelabel->NO_OF_LOOSE_QUNATITY_IN_LAST_STICKER	=	((int) $this->quantity) - (((int) $article_ength->No_of_Cones_inside_the_Carton) * ((int)$cache));
            
            if(((int)$cache)>0){
                $nicelabel->PRINT_QUANTITY_FOR_LOOSE_STICKER	=	'1';
            }else{
                $nicelabel->PRINT_QUANTITY_FOR_LOOSE_STICKER	=	'0';
            }
            
            //$nicelabel->PRINT_QUANTITY_FOR_CONE_ROUND_STICKER	=	intval(((int) $this->quantity) + (((float) $this->quantity) * ((float) "0.03")));
            //$nicelabel->PRINT_QUANTITY_FOR_CONE_ROUND_STICKER	=	intval(((int) $this->quantity) + 9 + ((int)$cache));
            $nicelabel->PRINT_QUANTITY_FOR_CONE_ROUND_STICKER	=	intval(((int) $this->quantity) + 9 + (intval(((int) $this->quantity) / ((int) $article_ength->No_of_Cones_inside_the_Carton))));
            //$nicelabel->PRINT_QUANTITY_FOR_CONE_ROUND_STICKER	=	intval(((int) $this->quantity) + 9 + (intval(((int) $this->quantity) / ((int) $article_ength->No_of_Cones_inside_the_Carton))));
            
            $nicelabel->save();
    
            $this->alert('success', 'saved', [
                'position' =>  'center', 
                'timer' =>  3000,
            ]);

            $this->barcode = '';
            $this->quantity = '';
            
        }else{
            
            $this->barcode = '';
            $this->quantity = '';

            $this->alert('error', 'same barcode found', [
                'position' =>  'center', 
                'timer' =>  3000,
            ]);
        }
        
    }