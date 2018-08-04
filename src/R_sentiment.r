libraray(syuzhet)
path_to_load<-"/Users/yangyangwang/Documents/gutenberg/imsdb_scripts/scraping/texts/"
path_to_save<-"/Users/yangyangwang/Documents/gutenberg/imsdb_scripts/normed_sentiment/"
file_names=list.files(path = path_to_load,recursive = TRUE)
i<-1
for (file in file_names) {
print(i)
i <- (i+ 1)
load_file_path<-paste(path_to_load,file,sep="")
save_file_path<-paste(path_to_save,file,sep="")
text<- get_text_as_string(load_file_path)
sentence<- get_sentences(text)
sentiment <- get_sentiment(sentence)
normed_sentiment <- get_dct_transform(sentiment, scale_range = T, low_pass_size = 5)
write.table(normed_sentiment,save_file_path, row.names = FALSE, col.names=FALSE, sep = "\t")
}
