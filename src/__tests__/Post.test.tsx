import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Post } from "../components/Post";

describe("Post", () => {
  it("increments the like counter on like button click", async () => {
    render(<Post id={1} title={"my post"} body={"my body"} />);

    const likesSection = await screen.findByTestId("likes");
    expect(likesSection.innerHTML).toContain("Number of likes: 0");

    const likeButton = await screen.findByTestId("like-button");
    await user.click(likeButton);
    expect(likesSection.innerHTML).toContain("Number of likes: 1");
  });
});
