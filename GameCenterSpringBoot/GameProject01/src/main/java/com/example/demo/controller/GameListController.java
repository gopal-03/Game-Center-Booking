package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.GamesList;
import com.example.demo.service.GamesService;

@RestController
@RequestMapping("/admingames")
@CrossOrigin("http://localhost:5173/")
public class GameListController {

    @Autowired
    private GamesService gamesService;


    @GetMapping("/gameslist/{username}")
    public ResponseEntity<List<GamesList>> listGames(@PathVariable String username) {
        List<GamesList> gamesList = gamesService.getGamesListByUsername(username);
        return new ResponseEntity<>(gamesList, HttpStatus.OK);
    }

    @PostMapping("/addgame/{username}")
    public ResponseEntity<String> saveGameData(@ModelAttribute GamesList gamesList,
    											@PathVariable String username,
                                               @RequestParam MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            gamesList.setGameImage(image.getBytes());
            gamesList.setImageContentType(image.getContentType());
        }
        gamesService.saveGameDetail(username,gamesList);
        return new ResponseEntity<>("Game data saved successfully", HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}/{username}")
    public ResponseEntity<String> updateGame(@PathVariable Long id,
    										@PathVariable String username,
                                              @ModelAttribute GamesList gamesList,
                                              @RequestParam MultipartFile image) throws IOException {
        GamesList existingGame = gamesService.getGameDetailtById(id);
        if (image != null && !image.isEmpty()) {
            gamesList.setGameImage(image.getBytes());
        } else {
            gamesList.setGameImage(existingGame.getGameImage());
        }
        gamesList.setId(id); // Ensure the ID is set for updating
        gamesService.saveGameDetail(username,gamesList);
        return new ResponseEntity<>("Game updated successfully", HttpStatus.OK);
    }

//    @GetMapping("/edit/{id}")
//    public ResponseEntity<GamesList> editGame(@PathVariable Long id) {
//        GamesList game = gamesService.getGameDetailtById(id);
//        return new ResponseEntity<>(game, HttpStatus.OK);
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteGame(@PathVariable Long id) {
        gamesService.deleteGameDetail(id);
        return new ResponseEntity<>("Game deleted successfully", HttpStatus.OK);
    }

//    @GetMapping("/userlist")
//    public ResponseEntity<List<GamesList>> userListGames() {
//        List<GamesList> gamesList = gamesService.getAllGameDetails();
//        return new ResponseEntity<>(gamesList, HttpStatus.OK);
//    }
}


