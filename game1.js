
    class Tile
    {
        constructor()
        {
            this.hasImg = false;
            this.player = "";
        }
        reset()
        {
        this.hasImg = false;
        this.player = "";
        }
        place(player){
            if(this.hasImg)
                return;
            this.hasImg = true;
            this.player = player};

        remove(){
            if(!this.hasImg)
                return;
            this.hasImg = false;
            let copy = this.player;
            this.player = "";
            return copy;
            }
    }
    class Tiles
    {
        constructor(size)
        {
             this.size = size;
             this.arr = new Array(size);
             for(var i = 0; i < size; i++)
             {
                this.arr[i] = new Array(size);
                 for(var j = 0; j < size; j++)
                     {
                        this.arr[i][j] = new Tile();
                     }
              }
        }
        reset()
        {
            for(var i = 0; i < this.size; i++)
            {
                for(var j = 0; j < this.size; j++)
                {
                    this.arr[i][j].reset();
                }
            }
        }
        place(row, column, player)
        {
            this.arr[row][column].place(player);
        }

        getTile(row,column)
        {
            return this.arr[row][column];
        }
    }
    var app = angular.module("tictactoe", []);
    app.controller("control1", function($scope){
    $scope.game = new Tiles(3);
    $scope.gameOver = false;
    $scope.player = "x";
    $scope.winner = "none";
    $scope.numMoves = 0;
    $scope.reset = function()
    {
        $scope.game.reset();

        $scope.player = "x";
        $scope.gameOver = false;
        $scope.winner = "none";
        $scope.numMoves = 0;
    };
    $scope.printAll = function()
    {
    console.log($scope.game.size);
        for(var i = 0; i < $scope.game.size; i++)
        {
            for(var j = 0; j < $scope.game.size; j++)
            {
                console.log($scope.game.getTile(i,j).player);
            }
        }
    };

    $scope.place = function(row, column)
    {
        $scope.winner = $scope.checkWinner();
        if($scope.gameOver)
            return;
        if($scope.player == "x")
        {
            $scope.game.place(row,column,"x");
            $scope.player = "o";
        }
        else
        {
            $scope.game.place(row,column,"o");
            $scope.player = "x";
        }
        $scope.numMoves++;
        $scope.winner = $scope.checkWinner();
    };

    $scope.checkWinner = function()
    {
        var winner = "none";
        for(let row = 0; row < $scope.game.size; row++) //check columns
        {
            var looking = $scope.game.getTile(row,0);
            var sum = 0;
            for(let col = 0; col < $scope.game.size; col++)
            {
                var tile = $scope.game.getTile(row,col);
                if(tile.hasImg && tile.player == looking.player)
                    sum++;
            }
            if(sum == $scope.game.size)
            {
                winner = looking.player;
            }
        }
        for(let row = 0; row < $scope.game.size; row++) //check rows
        {
            var looking = $scope.game.getTile(0,row);
            var sum = 0;
            for(let col = 0; col < $scope.game.size; col++)
            {
                var tile = $scope.game.getTile(col,row);
                if(tile.hasImg && tile.player == looking.player)
                    sum++;
            }
            if(sum == $scope.game.size)
            {
                winner = looking.player;
            }
        }

        for(let index = 0, sum = 0; index < $scope.game.size; index++) //check diag
        {
            var looking = $scope.game.getTile(0,0);
            var tile = $scope.game.getTile(index,index);
            if(tile.hasImg && tile.player == looking.player)
                sum++;
            if(sum == $scope.game.size)
            {
                winner = looking.player;
            }
        }
        var sum = 0;
        for(let row = 0, column = $scope.game.size-1; row < $scope.game.size; row++, column--) //check rdiag
        {
            var looking = $scope.game.getTile(0, $scope.game.size-1);
            var tile = $scope.game.getTile(row,column);
            if(tile.hasImg && tile.player == looking.player)
                sum++;
            if(sum == $scope.game.size)
            {
                winner = looking.player;
            }
        }
        if(winner != "none")
            $scope.gameOver = true;
         if($scope.numMoves == $scope.game.size * $scope.game.size &&
         winner == "none")
         {
         $scope.gameOver = true;
         winner = "draw";
         }
        return winner;

    };



    }); //end of controller