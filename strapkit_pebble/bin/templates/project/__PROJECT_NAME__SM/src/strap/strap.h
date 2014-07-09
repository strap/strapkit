#ifndef STRAP_H
#define STRAP_H

#define STRAP_FREQ_HIGH     1  // more data collection, but higher power drain
#define STRAP_FREQ_MED      2  // less data collection, with moderate power drain
#define STRAP_FREQ_LOW      3  // least data collection, lowest power drain

void strap_init();
void strap_deinit();
void strap_log_action(char *);
void strap_log_event(char *);
void strap_out_sent_handler(DictionaryIterator *, void *);
void strap_out_failed_handler(DictionaryIterator *, AppMessageResult , void *);
void strap_set_activity(char*);
void strap_set_freq(int);

#endif


