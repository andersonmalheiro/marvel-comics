import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Comic, ComicFilters, ComicService, httpClient } from 'api';
import { ComicList } from 'components/comic-list';
import { ComicModal } from 'components/comic-modal';
import { Drawer, useDrawer } from 'components/drawer-component';
import { DEFAULT_FILTERS, Filters } from 'components/filters';
import { LoadingIndicator } from 'components/loading-indicator';
import { MdSearch, MdSend, MdSync } from 'react-icons/md';
import { Button, FlexColumn, FlexRow, GhostBtn } from 'styles/utils';
import axios from 'axios';
import { MailMessage } from 'pages/api/providers/mailtrap.provider';
import { template } from './email-template';
import { useForm } from 'hooks/useForm';
import { Form } from 'components/form';
import { Input } from 'components/inputs';

export const ComicListWrapper = () => {
  const comicService: ComicService = new ComicService(httpClient);

  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedComics, setSelectedComics] = useState<Comic[]>([]);
  const [drawerOpen, toggleDrawer] = useDrawer();
  const [selectedComic, setSelectedComic] = useState<Comic>(null);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);

  const loadComics = async (filters: ComicFilters) => {
    setLoading(true);
    const res = await comicService.list(filters);
    try {
      setLoading(false);
      if (res && res.results) {
        setComics(res.results);
      }
    } catch (error) {
      setLoading(false);
      setComics([]);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    loadComics(DEFAULT_FILTERS);
  }, []);

  const sendEmail = async () => {
    const { from_email, from_name, to_email, to_name, subject } = values;
    const mail: MailMessage = {
      from: {
        email: from_email,
        name: from_name,
      },
      to: {
        email: to_email,
        name: to_name,
      },
      body: template(selectedComics),
      subject,
    };

    setSending(true);
    try {
      await axios.post('api/mail', mail);
      setSending(false);
      setSelectedComics([]);
      setValues({});
    } catch (error) {
      console.error(error);
      setSending(false);
    }
  };

  const { handleChange, handleSubmit, values, setValues } = useForm(sendEmail);

  const onSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    comic: Comic
  ) => {
    const target = event.target;
    const value = target.checked;

    if (value) {
      setSelectedComics((prev) => {
        return [...prev, comic];
      });
    } else {
      setSelectedComics((prev) => {
        return prev.filter((com) => com.id !== comic.id);
      });
    }
  };

  const openModal = (comic: Comic) => {
    setSelectedComic(comic);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComic(null);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setDisabledSend(canSendEmail());
  }, [values]);

  const canSendEmail = (): boolean => {
    if (formRef && formRef.current) {
      return formRef.current.checkValidity() && !!selectedComics.length;
    }

    return false;
  };

  return (
    <FlexColumn>
      <FlexColumn>
        <FlexRow gap="1em" aligment="center">
          <h1>Comics</h1>
          <GhostBtn onClick={toggleFilters}>
            <MdSearch size={20} />
            <span className="text">Toggle filters</span>
          </GhostBtn>
          <GhostBtn onClick={toggleDrawer}>
            <MdSend size={20} />
            <span className="text">Send comics</span>
          </GhostBtn>
        </FlexRow>
        {showFilters && <Filters onFilter={loadComics} />}
      </FlexColumn>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <ComicList
          data={comics}
          showSelect={true}
          onClickComic={openModal}
          onSelectComic={onSelect}
        />
      )}

      <Drawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={'Send email'}
      >
        <FlexColumn margin="10px 0" gap="1em">
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Input
              label={'Your name'}
              type={'text'}
              name="from_name"
              id="from_name"
              data-testid="from_name"
              value={values?.from_name || ''}
              placeholder="Your name..."
              onChange={handleChange}
              required={true}
            />
            <Input
              label={'Your e-mail'}
              type={'email'}
              name="from_email"
              id="from_email"
              data-testid="from_email"
              value={values?.from_email || ''}
              placeholder="Your email..."
              onChange={handleChange}
              required={true}
            />
            <Input
              label={'Friend name'}
              type={'text'}
              name="to_name"
              id="to_name"
              data-testid="to_name"
              value={values?.to_name || ''}
              placeholder="Your friend name..."
              onChange={handleChange}
              required={true}
            />
            <Input
              label={'Friend e-mail'}
              type={'email'}
              name="to_email"
              id="to_email"
              data-testid="to_email"
              value={values?.to_email || ''}
              placeholder="Your friend email..."
              onChange={handleChange}
              required={true}
            />
            <Input
              label={'Subject'}
              type={'text'}
              name="subject"
              id="subject"
              data-testid="subject"
              value={values?.subject || ''}
              placeholder="E-mail subject..."
              onChange={handleChange}
              required={true}
            />
            <ComicList
              emptyMessage={'No comics selected...'}
              data={selectedComics}
              showSelect={false}
            />
            <FlexRow aligment="center" justify="center" padding="1em" gap="1em">
              <Button
                type="submit"
                styling="primary"
                data-testid="submit"
                id="submit"
                disabled={sending || !disabledSend}
              >
                Send e-mail
              </Button>
            </FlexRow>
          </Form>
        </FlexColumn>
      </Drawer>

      {selectedComic && (
        <ComicModal data={selectedComic} open={showModal} close={closeModal} />
      )}
    </FlexColumn>
  );
};
