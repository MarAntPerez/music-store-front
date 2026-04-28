@GetMapping("/albums")
public List < AlbumDto > getAllAlbums() {

    return albumService.getAllAlbums();

}