import React from "react";
import { MessageCircle, ArrowDownToLine, MoreHorizontal } from "lucide-react";
import { Container, Button, Link } from 'react-floating-action-button'

export const CTAButton = () => {
  return (
    <Container className="z-20 !bottom-0 !right-0 animate-bounce hover:animate-none">
      <Link 
        href="#"
        tooltip="Chat with Project Director"
        className="z-20"
      >
        <MessageCircle />
      </Link>
      <Link 
        href="#"
        tooltip="Download Government Brochure"
        className="fab-item btn btn-link btn-lg text-white z-20"
      >
        <ArrowDownToLine />
      </Link>
      <Button
        tooltip="Action"
        rotate={true}
      >
        <MoreHorizontal />
      </Button>
    </Container>
  )
};
