'use strict';
var gemSize = 50,
    size = 6, border_size = 10;

function set_table_size( sz ) {
  size = sz;
}

function printTable(arrs) {
  var gemSize = 50, len = arrs.length, gameTable = $('<ul />', {class: 'game'}), gemElem ;
  var idx = 1;
  for( var i = 0; i < len ; ++i ) {
    for( var j = 0; j < len ; ++j ) {
      gemElem = $('<li />', {class: 'gem '+arrs[i][j]}).data('gem', {index: (i+1)+'-'+(j+1), x: j*gemSize, y: (i)*gemSize, type: arrs[i][j]}).css('-webkit-transform','translate(' + j*gemSize + 'px,' + (i)*gemSize + 'px)');
      gameTable.append(gemElem.append($('<span />')));
      ++idx;
    }
  }
  gameTable.width(gemSize*(len+2)+border_size*2).height(gemSize*(len+2)+border_size*2);
  $('.main-game').append(gameTable);
}

// check relation of two gems' position : right, left, top, bottom
function is_right(gem_1, gem_2) {
  var gem_1_coor = (gem_1.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      gem_2_coor = (gem_2.data('gem').index).split('-').map(function(a){ return parseInt(a);});
  return ( (gem_1_coor[1]+1 == gem_2_coor[1]) && (gem_1_coor[0] == gem_2_coor[0]) );
}
function is_left(gem_1, gem_2) {
  var gem_1_coor = (gem_1.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      gem_2_coor = (gem_2.data('gem').index).split('-').map(function(a){ return parseInt(a);});
  return ( (gem_1_coor[1]-1 == gem_2_coor[1]) && (gem_1_coor[0] == gem_2_coor[0]) );
}
function is_top(gem_1, gem_2) {
  var gem_1_coor = (gem_1.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      gem_2_coor = (gem_2.data('gem').index).split('-').map(function(a){ return parseInt(a);});
  return ( (gem_1_coor[0]-1 == gem_2_coor[0]) && (gem_1_coor[1] == gem_2_coor[1]) );
}
function is_bottom(gem_1, gem_2) {
  var gem_1_coor = (gem_1.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      gem_2_coor = (gem_2.data('gem').index).split('-').map(function(a){ return parseInt(a);});
  return ( ((gem_1_coor[0]+1) == gem_2_coor[0]) && (gem_1_coor[1] == gem_2_coor[1]) );
}

/**
* Get top gem of a gem.
* @param  { jQuery Object } An instance of a gem
* @return { jQuery Object } An instance of input gem's top gem
*/
function top_gem(gem) {
  var result = false, gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}), this_coor;

  $('.gem').not(gem).each(function(i){
    this_coor = ($(this).data('gem').index).split('-').map(function(a){ return parseInt(a);});

    if ( (this_coor[1] == gem_coor[1]) && ( (this_coor[0]+1) == gem_coor[0] ) ) {
      result = this;
    }
  });
  return result;
}

/**
* Get bottom gem of a gem.
* @param  { jQuery Object } An instance of a gem
* @return { jQuery Object } An instance of input gem's bottom gem
*/
function bottom_gem(gem) {
  var result = false, gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}), this_coor;

  $('.gem').not(gem).each(function(i){
    this_coor = ($(this).data('gem').index).split('-').map(function(a){ return parseInt(a);});

    if ( (this_coor[1] == gem_coor[1]) && ( (this_coor[0]-1) == gem_coor[0] ) ) {
      result = this;
    }
  });
  return result;
}

/**
* Get left gem of a gem.
* @param  { jQuery Object } An instance of a gem
* @return { jQuery Object } An instance of input gem's left gem
*/
function left_gem(gem) {
  var result = false, gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}), this_coor;

  $('.gem').not(gem).each(function(i){
    this_coor = ($(this).data('gem').index).split('-').map(function(a){ return parseInt(a);});

    if ( ( (this_coor[1] + 1) == gem_coor[1] ) && ( this_coor[0] == gem_coor[0] ) ) {
      result = this;
    }
  });
  return result;
}

/**
* Get right gem of a gem.
* @param  { jQuery Object } An instance of a gem
* @return { jQuery Object } An instance of input gem's right gem
*/
function right_gem(gem) {
  var result = false, gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}), this_coor;

  $('.gem').not(gem).each(function(i){
    this_coor = ($(this).data('gem').index).split('-').map(function(a){ return parseInt(a);});

    if ( ( (this_coor[1] - 1) == gem_coor[1]) && ( this_coor[0] == gem_coor[0] ) ) {
      result = this;
    }
  });
  return result;
}

/**
* Get all bottom gems which have same type of a gem.
* @param  { jQuery Object } An instance of a gem
* @param  { Array } An array of bottom gems which have same type, just use for recursion
* @return { DOMElement[] } An array of top gems which have same type
*/ 
function gems_bottom(gem, sameType) {
  var result = true,
      gem_color = gem.data('gem').type,
      gem_coor = gem.data('gem').index.split('-').map(function(a){ return parseInt(a);}),
      bottom_gem_el = bottom_gem(gem);
  if ( !sameType ) {
    sameType = [ gem[0] ];
  }
  if ( !bottom_gem_el ) {
    return sameType;
  }

  var bottom_gem_color = $(bottom_gem_el).data('gem').type,
      bottom_gem_coor = $(bottom_gem_el).data('gem').index.split('-').map(function(a){ return parseInt(a);});

  if ( (bottom_gem_coor[0] == size) && gem_color == bottom_gem_color) {
    sameType.push(bottom_gem_el);
    return sameType;
  } 

  if ( gem_color == bottom_gem_color ) {
    sameType.push( bottom_gem_el );
    result = gems_bottom( $(bottom_gem_el), sameType );
  } else {
    return sameType;
  }
  return result;
}

/**
* Get all top gems which have same type of a gem.
* @param  { jQuery Object } An instance of a gem
* @param  { Array } An array of top gems which have same type, just use for recursion
* @return { DOMElement[] } An array of top gems which have same type
*/ 
function gems_top(gem, sameType) {
  var result = false,
      gem_color = gem.data('gem').type,
      gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      top_gem_el = top_gem(gem);

  if ( !sameType ) {
    sameType = [ gem[0] ];
  }
  if ( !top_gem_el ) {
    return sameType;
  }
  var top_gem_color = $(top_gem_el).data('gem').type,
      top_gem_coor = $(top_gem_el).data('gem').index.split('-').map(function(a){ return parseInt(a);});
  
  

  if ( (top_gem_coor[0] == 1) && gem_color == top_gem_color) {
    sameType.push( top_gem_el );
    return sameType;
  }

  if ( gem_color == top_gem_color ) {
    sameType.push( top_gem_el );
    result = gems_top($(top_gem_el), sameType);
  } else {
    return sameType;
  }

  return result;
}

/**
* Get all left gems which have same type of a gem.
* @param  { jQuery Object } An instance of a gem
* @param  { Array } An array of left gems which have same type, just use for recursion
* @return { DOMElement[] } An array of left gems which have same type
*/ 
function gems_left(gem, sameType) {
  var result = false,
      gem_color = gem.data('gem').type,
      gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      left_gem_el = left_gem(gem);

  if ( !sameType ) {
    sameType = [ gem[0] ];
  }
  if ( !left_gem_el ) {
    return sameType;
  }
  var left_gem_color = $(left_gem_el).data('gem').type,
      left_gem_coor = $(left_gem_el).data('gem').index.split('-').map(function(a){ return parseInt(a);});
  
  

  if ( (left_gem_coor[1] == 1) && gem_color == left_gem_color) {
    sameType.push( left_gem_el );
    return sameType;
  }

  if ( gem_color == left_gem_color ) {
    sameType.push( left_gem_el );
    result = gems_left($(left_gem_el), sameType);
  } else {
    return sameType;
  }

  return result;
}

/**
* Get all right gems which have same type of a gem.
* @param  { jQuery Object } An instance of a gem
* @param  { Array } An array of right gems which have same type, just use for recursion
* @return { DOMElement[] } An array of right gems which have same type
*/ 
function gems_right(gem, sameType) {
  var result = false,
      gem_color = gem.data('gem').type,
      gem_coor = (gem.data('gem').index).split('-').map(function(a){ return parseInt(a);}),
      right_gem_el = right_gem(gem);

  if ( !sameType ) {
    sameType = [ gem[0] ];
  }
  if ( !right_gem_el ) {
    return sameType;
  }
  var right_gem_color = $(right_gem_el).data('gem').type,
      right_gem_coor = $(right_gem_el).data('gem').index.split('-').map(function(a){ return parseInt(a);});
  
  

  if ( (right_gem_coor[1] == 1) && gem_color == right_gem_color) {
    sameType.push( right_gem_el );
    return sameType;
  }

  if ( gem_color == right_gem_color ) {
    sameType.push( right_gem_el );
    result = gems_right($(right_gem_el), sameType);
  } else {
    return sameType;
  }

  return result;
}

/**
* Get all top gems regardless of gem's type.
* @param  { jQuery Object } An instance of a gem
* @param  { Array } An array of top gems which have same type, just use for recursion
* @return { DOMElement[] } An array of top gems which have same type
*/ 
function gems_top_all_type(gem, top1) {
  var result = [],
      gem_coor = gem.data('gem').index.split('-'),
      topGem = top_gem( gem ),
      top_coor;

  if ( !topGem && !top1 ) {
    return result;
  } else if ( !topGem && top1 ) {
    return top1;
  }

  top_coor = $(topGem).data('gem').index.split('-');

  if ( !top1 ) top1 = [ topGem ];
  else top1.push( topGem );

  if ( top_coor[0] == 1 ) {
    return top1;
  } else { 
    result = gems_top_all_type( $(topGem), top1 );
  }
  return result;  
}

/**
* Get all gems with same type in 2 line : horizontal and vertical line of a gem.
* 
* @param { jQuery Object } A jQuery Object to identify gem
* @return { Array || Boolean } Return an array of gems on 2 line if they satisfied removing gem rule , else return false.
*/
function gems_in_line(gem) {
  if ( typeof gem.data('gem') == 'undefined' ) return false;
  var top1   = gems_top( gem ),
      bottom = gems_bottom( gem ),
      left   = gems_left( gem ),
      right  = gems_right( gem ),
      total_gems_in_line = [],
      result;

  if ( bottom.length >= 3 ) {
    $.merge(total_gems_in_line, bottom);
  }

  if ( top1.length >= 3 ) {
    $.merge(total_gems_in_line, top1);
  }

  if ( left.length >= 3 ) {
    $.merge(total_gems_in_line, left);
  }

  if ( right.length >= 3 ) {
    $.merge(total_gems_in_line, right);
  }

  if ( right.length + left.length >= 4 ) {
    $.merge(total_gems_in_line, right);
    $.merge(total_gems_in_line, left);
  }

  if ( bottom.length + top1.length >= 4 ) {
    $.merge(total_gems_in_line, bottom);
    $.merge(total_gems_in_line, top1);
  }

  $.unique(total_gems_in_line);
  result = (total_gems_in_line.length >= 3) ? total_gems_in_line : false;
  return ( result ) ? result.sort(
      function(gem_1, gem_2){
        var gem_1_x = $(gem_1).data('gem').x,
            gem_1_y = $(gem_1).data('gem').y,
            gem_2_x = $(gem_2).data('gem').x,
            gem_2_y = $(gem_2).data('gem').y;

        return ( gem_1_x == gem_2_x && gem_1_y == gem_2_y) ? 0 : ( gem_1_x > gem_2_x || gem_1_y > gem_2_y ) ? 1 : -1;
      }
    ) : result;
}

/**
* Check the game table when game start or when relayout game table.
*
* @return null
*/
function check_table(gem_type) {
  var all_gems = $('.main-game').find('.gem'), 
      total_gems_in_line,
      check = true,
      removed = [],
      top_gems = [], // x and y of each top gem of removed gems
      new_gem, gem_coor, new_gems = [], pre_gem_coor;
  // Iterate each gem on the game table
    // re-initialize necessary arrays
  var a = setTimeout(function(){
    for( var i = 0, amount = all_gems.length; i < amount; ++i ) {
      // ..if gem is removed, continue to next gem
      if ( $.inArray( all_gems[i], removed) != -1 ) {
        continue;
      }

      total_gems_in_line = gems_in_line( $( all_gems[i] ) );

      if ( total_gems_in_line ) {
        // ..if total gems in 4 line satisfied the removing gems rule, remove it and add this gem to removed gems list
        $.merge(removed, total_gems_in_line);
        
      }
    }
    
    console.info( "%c /=============================================" + "\r\n" + "=                Checked Tbl.                  =" + "\r\n" + "=============================================/", "background: #2ce350; font-weight: bold; color: #fff");
    for ( var j = 0 , len = removed.length; j < len ; ++j ) {
      if ( $(removed[j]).length == 0 ) {continue;}
      top_gems = gems_top_all_type($(removed[j]));
      gem_coor = $( removed[j] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
      if ( removed[j-1] ) {
        pre_gem_coor = $( removed[j-1] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
      }

      new_gem = { data: {} };
      new_gem.data.x = (gem_coor[1]-1)*50;
      new_gem.data.y = (gem_coor[0]-top_gems.length-1)*50;
      new_gem.data.type = gem_type[ Math.floor(Math.random()*gem_type.length) ];
      new_gem.data.index = (gem_coor[0]-top_gems.length) + '-' + gem_coor[1];

      if ( removed[j-1] && (pre_gem_coor[1] == (gem_coor[1])) ) {
        new_gem.data.x = (gem_coor[1]-1)*50;
        new_gem.data.y = (gem_coor[0]-top_gems.slice(j).length-1)*50;
        new_gem.data.index = (gem_coor[0]-top_gems.slice(j).length) + '-' + gem_coor[1];
        console.info('case 1');
      }
      new_gems.push(new_gem);

      console.info("%c New gem check tbl: " ,new_gem.data.index, "x : " + new_gems[j].data.x, "y : " + new_gems[j].data.y, "background: #fff; color: #fff" );

      console.log( removed[j] );

      console.log($(removed[j]).data('gem'));

      $(removed[j]).animate(
        { 'opacity' : 0 },
        {
          complete: (function(t, a) { 
            return function() {
              var gem_x, gem_y, gem_coor;

              for ( var h = 0, top_gems_amount = t.length; h < top_gems_amount; ++h ) {
                if ( typeof $( t[h] ).data('gem') == 'undefined' ) continue;
                if ( $.inArray(t[h], removed) == -1 ) {
                  gem_x = $( t[h] ).data('gem').x;
                  gem_y = $( t[h] ).data('gem').y;
                  gem_coor = $( t[h] ).data('gem').index.split('-').map( function(coor){ return parseInt(coor); } );

                  $(t[h]).css('-webkit-transform', 'translate(' + gem_x + 'px,' + ( gem_y + gemSize ) + 'px)' );
                  $(t[h]).data('gem').index = ( gem_coor[0] + 1 ) + '-' + gem_coor[1] ;
                  $(t[h]).data('gem').y = gem_y + gemSize;
                }
              }
              $(a).detach();
            }
            
          })(top_gems, removed[j])
        }
      );
    }
    var new_gem;
    for ( var k = 0, new_gem_amount = new_gems.length; k < new_gem_amount; ++k ) {
      new_gem = $('<li />', {class: "gem " + new_gems[k].data.type }).append($('<span />'));
      new_gem.data('gem', new_gems[k].data);

      new_gem.appendTo('.game');
      
      new_gem.css( '-webkit-transform', 'translate(' + new_gems[k].data.x + 'px,' + new_gems[k].data.y + 'px)' );
    }
    new_gems = [];
    setTimeout(function(){
      if ( !has_same_gems_on_table() ) {
        clearTimeout(a);
      } else {
        setTimeout(function() { check_table(gem_type); }, 400);
      }  
    }, 500);
    
  }, 400);  
    
}

/**
* Check if the table still have more than 3 gems on a line.
*
* @return { Boolean } true || false
*/
function has_same_gems_on_table() {
  var all_gems = $('.main-game').find('.gem'), 
      sameType = [],
      total_gems_in_line;

  
  all_gems.each(function(i) {
    total_gems_in_line = gems_in_line($(this));

    if ( total_gems_in_line ) {
      $.merge( sameType, total_gems_in_line );
      $.unique( sameType );
      
    }
  });

  if ( (sameType.length === 0) ) return false;

  return true;
}

/**
* Exchange position of 2 gems
*
* @param { jQuery Object } Gem 1
* @param { jQuery Object } Gem 2
* @return void 
*/
function exchange(gem_1, gem_2) {
  var gem_1_data = gem_1.data('gem'),
      gem_2_data = gem_2.data('gem'),
      gem_1_type = gem_1_data.type,
      gem_2_type = gem_2_data.type,
      x_1 = gem_1_data.x,
      y_1 = gem_1_data.y,
      x_2 = gem_2_data.x,
      y_2 = gem_2_data.y;
  if ( is_right(gem_1, gem_2) ) {
    gem_1.data('gem', gem_2_data).css('-webkit-transform', 'translate('+(x_1+gemSize)+'px,'+y_1+'px)');
    gem_1.data('gem').x = x_1+gemSize;
    gem_1.data('gem').y = y_1;

    gem_2.data('gem', gem_1_data).css('-webkit-transform', 'translate('+(x_2-gemSize)+'px,'+y_2+'px)');
    gem_2.data('gem').x = x_2-gemSize;
    gem_2.data('gem').y = y_2;
  } else if ( is_left(gem_1, gem_2) ) {
    gem_1.data('gem', gem_2_data).css('-webkit-transform', 'translate('+(x_1-gemSize)+'px,'+y_1+'px)');
    gem_1.data('gem').x = x_1-gemSize;
    gem_1.data('gem').y = y_1;
    
    gem_2.data('gem', gem_1_data).css('-webkit-transform', 'translate('+(x_2+gemSize)+'px,'+y_2+'px)');
    gem_2.data('gem').x = x_2+gemSize;
    gem_2.data('gem').y = y_2;
  } else if ( is_top(gem_1, gem_2) ) {
    gem_1.data('gem', gem_2_data).css('-webkit-transform', 'translate('+(x_1)+'px,'+(y_1-gemSize)+'px)');
    gem_1.data('gem').x = x_1;
    gem_1.data('gem').y = y_1-gemSize;
    gem_2.data('gem', gem_1_data).css('-webkit-transform', 'translate('+(x_2)+'px,'+(y_2+gemSize)+'px)');
    gem_2.data('gem').x = x_2;
    gem_2.data('gem').y = y_2+gemSize;
  } else if ( is_bottom(gem_1, gem_2) ) {
    gem_1.data('gem', gem_2_data).css('-webkit-transform', 'translate('+(x_1)+'px,'+(y_1+gemSize)+'px)');
    gem_1.data('gem').x = x_1;
    gem_1.data('gem').y = y_1+gemSize;
    
    gem_2.data('gem', gem_1_data).css('-webkit-transform', 'translate('+(x_2)+'px,'+(y_2-gemSize)+'px)');
    gem_2.data('gem').x = x_2;
    gem_2.data('gem').y = y_2-gemSize;
  }
  gem_1.data('gem').type = gem_1_type;
  gem_2.data('gem').type = gem_2_type;
}

/**
* 
*/
function new_gem() {

}

/**
* Make an array of
*
* @return null
*/
function make_gem(gems_type) {
  var rand, gemsTable = [];
       
  for(var i = 0; i < size ; ++i) {
    gemsTable[i] = [];
    for( var j = 0; j < size ; ++j) {
      rand = Math.floor(Math.random()*gems_type.length);
      gemsTable[i][j] = gems_type[rand];
      // check for same gem, if have 3 same gems in a line, will recreate this gem until they 're different
      if ( i > 1 ) {
        while ( gemsTable[i-1][j] == gemsTable[i][j] && gemsTable[i-2][j] == gemsTable[i][j] ) {
          rand = Math.floor(Math.random()*gems_type.length);
          gemsTable[i][j] = gems_type[rand];
        }  
      }

      if ( j > 1 ) {
        while ( gemsTable[i][j-1] == gemsTable[i][j] && gemsTable[i][j-2] == gemsTable[i][j] ) {
          rand = Math.floor(Math.random()*gems_type.length);
          gemsTable[i][j] = gems_type[rand];
        }  
      }
    }
  }

  return gemsTable;
}
$(function() {
  set_table_size(8);
  var game = $('.main-game'),
      gem_type = ['r','g','b','w','p','y'],
      gemsTable = make_gem( gem_type ), gem_coor, pre_gem_coor,
      total_of_active, total_of_self, top_gems, new_gem;

  var new_gems = [];

  printTable(gemsTable);

  // game
  $('body').on('click', '.gem', function(ev) {
                console.clear();

    var self = $(this), active, active_coor, direction;
        
    if ( !self.hasClass('active') ) {
      active = game.find('.active');

      if ( active.length !== 0 ) {
        if ( is_bottom(active, self) || is_top(active, self) || is_right(active, self) || is_left(active, self) ) {
          exchange(active, self);
          // bottom = (check_bottom(active, 1));
          total_of_active = gems_in_line(active) //
          total_of_self = gems_in_line(self) //.sort(sortGEM);
          

          
          if ( total_of_active || total_of_self ) {

            if ( total_of_active ) {
              console.info( "%c /=============================================" + "\r\n" + "=                  Active Gem                =" + "\r\n" + "=============================================/", "background: #2c3e50; font-weight: bold; color: #fff" );

              total_of_active.sort(
                function(gem_1, gem_2){
                  var gem_1_x = $(gem_1).data('gem').x,
                      gem_1_y = $(gem_1).data('gem').y,
                      gem_2_x = $(gem_2).data('gem').x,
                      gem_2_y = $(gem_2).data('gem').y;

                  return ( gem_1_x == gem_2_x && gem_1_y == gem_2_y) ? 0 : ( gem_1_x > gem_2_x || gem_1_y > gem_2_y ) ? 1 : -1;
                }
              );
              window.total = (total_of_active);
              for ( var i = 0, len = total_of_active.length; i<len;++i ) {
                gem_coor = $( total_of_active[i] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
                if ( total_of_active[i-1] ) {
                  pre_gem_coor = $( total_of_active[i-1] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
                }
                top_gems = gems_top_all_type( $(total_of_active[i]) );

                new_gem = { data: {} };
                new_gem.data.x = (gem_coor[1]-1)*50;
                new_gem.data.y = (gem_coor[0]-top_gems.length-1)*50;
                new_gem.data.type = gem_type[ Math.floor(Math.random()*gem_type.length) ];
                new_gem.data.index = (gem_coor[0]-top_gems.length) + '-' + gem_coor[1];

                if ( total_of_active[i-1] && (pre_gem_coor[1] == (gem_coor[1])) ) {
                  new_gem.data.x = (gem_coor[1]-1)*50;
                  new_gem.data.y = (gem_coor[0]-top_gems.slice(i).length-1)*50;
                  new_gem.data.index = (gem_coor[0]-top_gems.slice(i).length) + '-' + gem_coor[1];
                }
                new_gems.push(new_gem);
                console.log("New gem active: ", new_gems[i].data.index, "x : " + new_gems[i].data.x, "y : " + new_gems[i].data.y );

                console.log( total_of_active[i] );

                console.log($(total_of_active[i]).data('gem'));

                $(total_of_active[i]).animate(
                  { 'opacity': 0 }, 
                  { duration: 'slow', complete: (function(t, a, window) { 
                      return function() {
                        var gem_x, gem_y, gem_coor;
                        for ( var h = 0, top_gems_amount = t.length; h < top_gems_amount; ++h ) {
                          if ( $.inArray(t[h], total_of_active) == -1 ) {

                            gem_x = $( t[h] ).data('gem').x;
                            gem_y = $( t[h] ).data('gem').y;
                            gem_coor = $( t[h] ).data('gem').index.split('-').map( function(coor){ return parseInt(coor); } );
                            /*new_gems[ new_gems.indexOf(window.new_gem) ].data('gem').x = gem_x;
                            new_gems[ new_gems.indexOf(window.new_gem) ].data('gem').y = gem_y;*/
                            $(t[h]).css('-webkit-transform', 'translate(' + gem_x + 'px,' + ( gem_y + gemSize ) + 'px)' );
                            $(t[h]).data('gem').index = ( gem_coor[0] + 1 ) + '-' + gem_coor[1] ;
                            $(t[h]).data('gem').y = gem_y + gemSize;
                          }
                        }
                        $(a).detach(); // ? detach()
                      }
                      
                    })(top_gems, total_of_active[i], window)
                  }
                );

              }

              var new_gem;
              for ( var k = 0, new_gem_amount = new_gems.length; k < new_gem_amount; ++k ) {
                new_gem = $('<li />', {class: "gem " + new_gems[k].data.type }).append($('<span />'));
                new_gem.data('gem', new_gems[k].data);

                new_gem.appendTo('.game');
                
                new_gem.css( '-webkit-transform', 'translate(' + (new_gems[k].data.x) + 'px,' + (new_gems[k].data.y) + 'px)' );
              }
              new_gems = [];
            }

            if ( total_of_self ) {
              console.info( "%c /=============================================" + "\r\n" + "=                Clicked Gem                  =" + "\r\n" + "=============================================/", "background: #2ce350; font-weight: bold; color: #fff");

              total_of_self.sort(
                function(gem_1, gem_2){
                  var gem_1_x = $(gem_1).data('gem').x,
                      gem_1_y = $(gem_1).data('gem').y,
                      gem_2_x = $(gem_2).data('gem').x,
                      gem_2_y = $(gem_2).data('gem').y;

                  return ( gem_1_x == gem_2_x && gem_1_y == gem_2_y) ? 0 : ( gem_1_x > gem_2_x || gem_1_y > gem_2_y ) ? 1 : -1;
                }
              );
              for ( var i = 0, len = total_of_self.length; i<len;++i ) {
                gem_coor = $( total_of_self[i] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
                if ( total_of_self[i-1] ) {
                  pre_gem_coor = $( total_of_self[i-1] ).data('gem').index.split('-').map(function(a){return parseInt(a);});
                }
                top_gems = gems_top_all_type( $(total_of_self[i]) );

                new_gem = { data: {} };
                new_gem.data.x = (gem_coor[1]-1)*50;
                new_gem.data.y = (gem_coor[0]-top_gems.length-1)*50;
                new_gem.data.type = gem_type[ Math.floor(Math.random()*gem_type.length) ];
                new_gem.data.index = (gem_coor[0]-top_gems.length) + '-' + gem_coor[1];

                if ( total_of_self[i-1] && (pre_gem_coor[1] == (gem_coor[1])) ) {
                  new_gem.data.x = (gem_coor[1]-1)*50;
                  new_gem.data.y = (gem_coor[0]-top_gems.slice(i).length-1)*50;
                  new_gem.data.index = (gem_coor[0]-top_gems.slice(i).length) + '-' + gem_coor[1];
                }
                new_gems.push(new_gem);

                console.info("New gem self: " ,new_gem.data.index, "x : " + new_gems[i].data.x, "y : " + new_gems[i].data.y );

                console.log( total_of_self[i] );

                console.log($(total_of_self[i]).data('gem'));

                $(total_of_self[i]).animate(
                  { 'opacity' : 0 }, 
                  { complete: (function(t, a) { 
                      return function() {
                        var gem_x, gem_y, gem_coor;

                        for ( var h = 0, top_gems_amount = t.length; h < top_gems_amount; ++h ) {
                          if ( $.inArray(t[h], total_of_self) == -1 && typeof $(t[h]).data('gem') != 'undefined') {
                            gem_x = $( t[h] ).data('gem').x;
                            gem_y = $( t[h] ).data('gem').y;
                            gem_coor = $( t[h] ).data('gem').index.split('-').map( function(coor){ return parseInt(coor); } );

                            $(t[h]).css( '-webkit-transform', 'translate(' + gem_x + 'px,' + ( gem_y + gemSize ) + 'px)' );
                            $(t[h]).data('gem').index = ( gem_coor[0] + 1 ) + '-' + gem_coor[1] ;
                            $(t[h]).data('gem').y = gem_y + gemSize;
                          }
                        }
                        $(a).detach();
                      }
                    })(top_gems, total_of_self[i])
                  }
                );
              }
              var new_gem;
              for ( var k = 0, new_gem_amount = new_gems.length; k < new_gem_amount; ++k ) {
                new_gem = $('<li />', {class: "gem " + new_gems[k].data.type }).append($('<span />'));
                new_gem.data('gem', new_gems[k].data);

                new_gem.appendTo('.game');
                
                new_gem.css( '-webkit-transform', 'translate(' + (new_gems[k].data.x) + 'px,' + (new_gems[k].data.y) + 'px)' );
              }
              new_gems = [];
            }
            
            setTimeout( function() { 
            
            check_table(gem_type); }, 500 );

          } else {
            setTimeout( function() { exchange(self, active); }, 300 );
          }
          
          /*if ( bottom ) {
            for ( var i = 0, len = bottom.length; i<len;++i ) {
              bottom[i].css('-webkit-transform','scale(0)').remove();
            }
          }*/
         
          // active.removeClass('active');
        } else {
          active.removeClass('active');
        }
      } else {
        self.addClass('active');
      }

    } else {
      self.removeClass('active');
    }
    return false;
  });
});